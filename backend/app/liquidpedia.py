import json
import requests

from config import LIQUIDPEDIA_HOST, LIQUIDPEDIA_API_KEY


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


def get_players():
    players = {}

    response = liquidpedia_request("api/v1/player")

    for player in response:
        region = player['region']
        id = player['id']
        if region not in players:
            players[region] = []
        players[region].append(id)

    return players
