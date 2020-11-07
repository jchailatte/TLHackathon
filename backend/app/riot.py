import json
import math
import requests
import urllib
from ratelimit import limits

from config import RIOT_HOST, RIOT_API_KEY, NUM_MATCHES
from data import champion_id_to_name, get_match_from_file, put_match_to_file

# ------------------------------ Request Handler ------------------------------
riot_session = requests.Session()

@limits(calls=20, period=1)
def make_call(url, headers):
	return riot_session.get(url, headers=headers)

def riot_request(endpoint, query_params={}):

	url = '{}/{}?{}'.format(RIOT_HOST, endpoint, urllib.parse.urlencode(query_params))

	headers = {
		'X-Riot-Token' : RIOT_API_KEY
	}

	r = None
	while r is None:
		try:
			r = make_call(url, headers)
		except:
			pass

	if r.status_code != 200:
		raise Exception('Failed to make request to Riot\nStatus Code: {}'.format(r.status_code))

	return r.json()


# ------------------------------ Data Collection ------------------------------
def get_account_id(player_name):
	endpoint = 'lol/summoner/v4/summoners/by-name/{}'.format(player_name)
	account_data = riot_request(endpoint)
	return account_data['accountId']


def get_account_matches(player_id, num_matches=100):
	endpoint = 'lol/match/v4/matchlists/by-account/{}'.format(player_id)

	matches = []
	for i in range(math.ceil(num_matches/100)):
		match_data = riot_request(endpoint, { "beginIndex" : i * 100 })

		for match in match_data['matches']:
			matches.append(match['gameId'])

	return matches


def get_match_details(match_id):
	stored_match = get_match_from_file(match_id)
	if stored_match:
		return stored_match

	endpoint = 'lol/match/v4/matches/{}'.format(match_id)
	match_data = riot_request(endpoint)

	put_match_to_file(match_id, match_data)
	return match_data

# ------------------------------ Data Manipulation ------------------------------
def get_match_history(player_name):
	account_id = get_account_id(player_name)
	match_history = get_account_matches(account_id, NUM_MATCHES)
	return match_history


def get_matches_with(player_a_name, player_b_name):
	player_a_match_history = get_match_history(player_a_name)
	player_b_match_history = get_match_history(player_b_name)

	intersect = list(set(player_a_match_history) & set(player_b_match_history))

	print("{} is in {} game(s) with {}".format(player_a_name, len(intersect), player_b_name))

	return intersect

def filter_same_team(player_a_name, player_b_name, matches):
	filtered_matches = []
	for match_id in matches:
		match_details = get_match_details(match_id)
		
		participant_team_mapping = {}
		for participant in match_details['participants']:
			participant_id = participant['participantId']
			team_id = participant['teamId']
			participant_team_mapping[participant_id] = team_id

		player_a_team = 0
		player_b_team = 0
		for identiy in match_details['participantIdentities']:
			summoner_name = identiy['player']['summonerName']
			if identiy['player']['summonerName'] == player_a_name:
				player_a_team = int(participant_team_mapping[identiy['participantId']])
			elif identiy['player']['summonerName'] == player_b_name:
				player_b_team = int(participant_team_mapping[identiy['participantId']])

		if player_a_team > 0 and player_b_team > 0 and player_a_team != player_b_team : 
			filtered_matches.append(match_id)

	return filtered_matches
		

def get_matches_against(player_a_name, player_b_name):
	matches_with = get_matches_with(player_a_name, player_b_name)
	matches_against = filter_same_team(player_a_name, player_b_name, matches_with)

	print("{} is in {} game(s) against {}".format(player_a_name, len(matches_against), player_b_name))

	return matches_against
