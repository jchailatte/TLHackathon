
import requests
from config import RIOT_API_KEY

# To regenerate: https://developer.riotgames.com/
# Expires: Sat, Nov 7th, 2020 @ 7:35pm (PT) in 21 hours and 26 minutes
# 20 requests every 1 seconds(s)
# 100 requests every 2 minutes(s)

def lol_api_request(endpoint):
  url = "https://na1.api.riotgames.com/" + endpoint
  return requests.get(url, headers={'X-Riot-Token': RIOT_API_KEY}).json()
