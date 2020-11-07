
import requests

# To regenerate: https://developer.riotgames.com/
# Expires: Sat, Nov 7th, 2020 @ 7:35pm (PT) in 21 hours and 26 minutes
# 20 requests every 1 seconds(s)
# 100 requests every 2 minutes(s)
RIOT_GAMES_API = "RGAPI-fcccb2ad-d44d-4b63-bd22-a03af410a87b"

def lol_api_request(endpoint):
  url = "https://na1.api.riotgames.com/" + endpoint
  return requests.get(url, headers={'X-Riot-Token': RIOT_GAMES_API}).json()
