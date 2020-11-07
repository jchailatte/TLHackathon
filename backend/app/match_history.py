import json
import requests
from riot_games_api import lol_api_request

# Expires: Sat, Nov 7th, 2020
# RATE LIMITS
# 20 requests every 1 seconds(s)
# 100 requests every 2 minutes(s)
RIOT_GAMES_API = "RGAPI-fcccb2ad-d44d-4b63-bd22-a03af410a87b"

def get_match_history(player_name):
  account_data = lol_api_request("lol/summoner/v4/summoners/by-name/" + player_name)
  account_id = account_data["accountId"]
  match_history = lol_api_request("lol/match/v4/matchlists/by-account/" + account_id)["matches"]
  expanded_match_history = []
  for match in match_history[:15]:
    match_id = match["gameId"]
    match_details = lol_api_request("lol/match/v4/matches/" + str(match_id))
    match_details["is_player"] = True
    expanded_match_history.append(match_details)

  return json.dumps(expanded_match_history)
