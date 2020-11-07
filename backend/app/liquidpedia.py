import json
import requests

from config import LIQUIDPEDIA_HOST, LIQUIDPEDIA_API_KEY

# ------------------------------ Request Handler ------------------------------
liquidpedia_session = requests.Session()


def liquidpedia_request(endpoint):

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

    r = liquidpedia_session.post(url, headers=headers, data=data)

    if r.status_code != 200:
        raise Exception("Failed to make request to Liquidpedia\nStatus Code: {}".format(r.status_code))

    return r.json()['result']

# ------------------------------ Data Collection ------------------------------
def get_players():
    endpoint = "api/v1/player"
    return liquidpedia_request(endpoint)

# ------------------------------ Data Manipulation ------------------------------
def get_region_to_players():
    players = get_players()

    ret = {}
    for player in players:
        region = player['region']
        id = player['id']
        if region not in players:
            players[region] = []
        ret[region].append(id)

    return players
