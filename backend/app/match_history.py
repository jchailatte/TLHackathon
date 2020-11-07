import json
import requests
from riot_games_api import lol_api_request


def get_match_history(player_name):
  account_data = lol_api_request("lol/summoner/v4/summoners/by-name/" + player_name)
  account_id = account_data["accountId"]
  match_history = lol_api_request("lol/match/v4/matchlists/by-account/" + account_id)["matches"]
  expanded_match_history = []
  for match in match_history[:15]:
    match_id = match["gameId"]
    match_details = lol_api_request("lol/match/v4/matches/" + str(match_id))
    for match_player in match_details["participantIdentities"]:
      if match_player["player"]["accountId"] == account_id:
        match_player["player"]["is_current_player"] = True
        # only one of the players should match per game, so break after found.
        break
    expanded_match_history.append(match_details)

  return json.dumps(expanded_match_history)
