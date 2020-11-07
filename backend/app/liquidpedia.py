import json
import requests
from cachetools import cached, TTLCache

from config import LIQUIDPEDIA_HOST, LIQUIDPEDIA_API_KEY
from util import hash


# ------------------------------ Request Handler ------------------------------
liquidpedia_session = requests.Session()


@cached(cache=TTLCache(maxsize=1024, ttl=600), key=hash)
def liquidpedia_request(endpoint, body={}):

    url = '{}/{}'.format(LIQUIDPEDIA_HOST, endpoint)

    headers = {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Cookie'       : 'LPDB_SESSION=8vda0sbblb7svu8nna50va667506oi4c'
    }

    data = {
        'wiki'   : 'leagueoflegends',
        'apikey' : LIQUIDPEDIA_API_KEY,
        'limit'  : 5000,
    }

    data = data | body

    r = liquidpedia_session.post(url, headers=headers, data=data)

    if r.status_code != 200:
        raise Exception("Failed to make request to Liquidpedia\nStatus Code: {}".format(r.status_code))

    return r.json()['result']

# ------------------------------ Data Collection ------------------------------
def get_players():
    endpoint = "api/v1/player"
    return liquidpedia_request(endpoint)


def get_player_matches(player_name):
    endpoint = "api/v1/matchfeed"

    additional_body_params = {
        'type' : 'player',
        'name' : player_name
    }

    return liquidpedia_request(endpoint, additional_body_params)


# ------------------------------ Data Manipulation ------------------------------
def get_region_to_players():
    players_data = get_players()

    players = {}
    for player in players_data:
        region = player['region']
        id = player['id']
        if region not in players:
            players[region] = []
        players[region].append(id)

    return players


def get_pro_matches_against(player_a_name, player_b_name):
    player_a_matches = get_player_matches(player_a_name)

    matches_against = []
    for match in player_a_matches:
        player_a_team = 0
        player_b_team = 0
        for _, value in match['opponent1players'].items():
            if value == player_a_name:
                player_a_team = 1
            if value == player_b_name:
                player_b_team = 1
        
        for _, value in match['opponent2players'].items():
            if value == player_a_name:
                player_a_team = 2
            if value == player_b_name:
                player_b_team = 2
        
        if player_a_team > 0 and player_b_team > 0 and player_a_team != player_b_team:
            matches_against.append(match)

    return matches_against
