from config import LIQUIDPEDIA_API_KEY

import json
import requests

def get_players_from_liquidpedia():
    url = 'https://api.liquipedia.net/api/v1/player'

    headers = {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Cookie'       : 'LPDB_SESSION=8vda0sbblb7svu8nna50va667506oi4c'
    }

    data = {
        'wiki'   : 'leagueoflegends',
        'apikey' : LIQUIDPEDIA_API_KEY,
        'limit'  : 1848,
    }

    r = requests.post(url, headers=headers, data=data)

    if r.status_code != 200:
        raise Exception("Failed to make request to Liquidpedia\nStatus Code: {}".format(r.status_code))

    return r.json()['result']


def get_players():
    players = {}

    response = get_players_from_liquidpedia()

    for player in response:
        region = player['region']
        id = player['id']
        if region not in players:
            players[region] = []
        players[region].append(id)

    return players

get_players()