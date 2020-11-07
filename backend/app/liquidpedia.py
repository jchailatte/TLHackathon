from config import LIQUIDPEDIA_API_KEY

import requests

def get_players_from_liquidpedia():
    url = 'https://api.liquipedia.net/api/v1/player'

    headers = {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Cookie'       : 'LPDB_SESSION=8vda0sbblb7svu8nna50va667506oi4c'
    }

    data = {
        'wiki': 'leagueoflegends',
        'apikey' : LIQUIDPEDIA_API_KEY,
        'limit' : 1,
        'conditions' : '[[pagename::Doublelift]]'
    }

    r = requests.post(url, headers=headers, data=data)
    return r.json()