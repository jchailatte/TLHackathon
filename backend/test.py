import requests

session = requests.Session()

url = 'https://api.liquipedia.net/api/v1/player'

headers = {
    'Content-Type' : 'application/x-www-form-urlencoded',
    'Cookie'       : 'LPDB_SESSION=8vda0sbblb7svu8nna50va667506oi4c'
}

body = {
    'wiki': 'leagueoflegends',
    'apikey' : 'n8zIGtMY7a5V3FuDvuJ48DxJo2BLsMgDN9pVJ1xg9E8Huv36iukmgNOaxi3ZEL8e5nrhOPrS07vW4zAWuQ3mEW27xHP8TpHyaCBgOOFmr84g6HZA7vZdGr0tCjosNrer',
    'limit' : 1,
    'conditions' : '[[pagename::Doublelift]]'
}

session.post(url, headers=headers, body=body)