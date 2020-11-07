import json
import requests

from config import RIOT_HOST, RIOT_API_KEY

# To regenerate: https://developer.riotgames.com/
# Expires: Sat, Nov 7th, 2020 @ 7:35pm (PT) in 21 hours and 26 minutes
# 20 requests every 1 seconds(s)
# 100 requests every 2 minutes(s)

riot_session = requests.Session()


def riot_request(endpoint):

	url = '{}/{}'.format(RIOT_HOST, endpoint)

	headers = {
		'X-Riot-Token' : RIOT_API_KEY
	}

	r = riot_session.get(url, headers=headers)

	if r.status_code != 200:
		raise Exception('Failed to make request to Riot\nStatus Code: {}'.format(r.status_code))

	return r.json()


def get_account_id(player_name):
	endpoint = 'lol/summoner/v4/summoners/by-name/{}'.format(player_name)
	account_data = riot_request(endpoint)
	return account_data['accountId']


def get_account_matches(player_id):
	endpoint = 'lol/match/v4/matchlists/by-account/{}'.format(player_id)
	match_data = riot_request(endpoint)
	return match_data['matches']


def get_match_details(match_id):
	endpoint = 'lol/match/v4/matches'


def get_match_history(player_name):
	account_id = get_account_id(player_name)
	match_history = get_account_matches(account_id)

	expanded_match_history = []
	for match in match_history[:15]:
		match_id = match["gameId"]
		match_details = riot_request("lol/match/v4/matches/" + str(match_id))
		for match_player in match_details["participantIdentities"]:
			if match_player["player"]["accountId"] == account_id:
				match_player["player"]["is_current_player"] = True
				# only one of the players should match per game, so break after found.
				break
		expanded_match_history.append(match_details)

	return json.dumps(expanded_match_history)
