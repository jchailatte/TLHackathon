
import requests

RIOT_GAMES_API = "RGAPI-fcccb2ad-d44d-4b63-bd22-a03af410a87b"

def lol_api_request(endpoint):
  url = "https://na1.api.riotgames.com/" + endpoint
  return requests.get(url, headers={'X-Riot-Token': RIOT_GAMES_API}).json()
