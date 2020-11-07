import json
import requests

from config import RIOT_HOST, RIOT_API_KEY
from data import champion_id_to_name

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
	endpoint = 'lol/match/v4/matches/{}'.format(match_id)
	return riot_request(endpoint)


def player_champion(match, name):
	# get participant id
	participant_id = 0
	for player in match['participantIdentities']:
		if player['player']['summonerName'] == name:
			participant_id = player['participantId']

	# get participants champion id
	champion_id = 0
	for player in match['participants']:
		if player['participantId'] == participant_id:
			champion_id = player['championId']

	# convert id to name
	return champion_id_to_name(champion_id)


def get_match_history(player_name):
	account_id = get_account_id(player_name)
	match_history = get_account_matches(account_id)
	
	print("found {} matches".format(len(match_history)))

	expanded_match_history = []
	for match in match_history[:15]:
		match_id = match["gameId"]

		match_details = get_match_details(match_id)

		expanded_match_history.append(match_details)

		print(player_champion(match_details, player_name))

	return expanded_match_history


def filter_matches_by_name(dirty_match_history, player_name):
	print("searching through {} matches".format(len(dirty_match_history)))
	cleaned_match_history = []
	for match in dirty_match_history:
		players = match['participantIdentities']
		match_players = [ player['player']['summonerName'] for player in players ] 
		if player_name in match_players:
			cleaned_match_history.append(match)

	return cleaned_match_history


def get_matches_between(player_a, player_b):
	player_a_match_history = get_match_history(player_a)

	filtered_matches = filter_matches_by_name(player_a_match_history, player_b)

	print("{} is in {} game(s) with {}".format(player_a, len(filtered_matches), player_b))

	return filtered_matches
