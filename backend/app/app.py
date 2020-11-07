from flask import Flask, request, jsonify
from itertools import product
import json
import requests

from data import bust_match_data
from riot import get_matches_against
from summoner_names import get_summoner_names_from_player_name
from calculate import calculate
from liquidpedia import get_region_to_players


app = Flask(__name__)


@app.route('/health_check')
def health_check():
    return 'OK'


@app.route('/compare', methods=['GET'])
def compare_players():
    '''
    Compares the two given players and returns the calculated win rate

    Parameters:
		player_a (str): first player to be compared
        player_b (str): second player to be compared

	Returns:
		win_rate (float): percent chance of player a winning against player_b

	Example:
		{
			"win_rate" : 0.2
		}
    '''

    player_a_name = request.args['player_a']
    player_b_name = request.args['player_b']

    # get summoner names for player a
    player_a_names = [ 'Doublelift', 'Peng Yiliang' ]

    # get summoner names for player b
    player_b_names = [ 'KEITH EXOTIC', 'KEITHMCBRIEF' ]

    # create permuations (without duplicates)
    permutations = list(product(player_a_names, player_b_names))

    # get soloqueue matches for all permutes
    matches = []
    for first, second in permutations:
        matches.extend(get_matches_against(first, second))
    print(len(matches))
    # get pro matches

    # calculate win loss

    # ret['win_rate'] = calculate(player_a_match_history, player_b_match_history)
    return jsonify(matches)


@app.route('/players', methods=['GET'])
def get_player_names():
    '''
    Fetches all league of legends players

	Returns:
		players ({str:[str]}): map of region strings -> list of player name strings

	Example:
		{
			"South Korea" : [
                "Huni",
                "Faker"
            ],
            "Southern Europe" : [
                "xPeke",
            ],
            "North America" : [
                "Doublelift"
            ]
		}
    '''
    return jsonify(get_region_to_players())


@app.route('/player', methods=['GET'])
def get_player_data():
    '''
    Fetches data for specified player

	Returns:
		player (str): player of interest

	Example:
		{
            some shit here
		}
    '''
    return 'placeholder'


@app.route('/bust_match_data', methods=['GET'])
def do_bust_match_data():
    '''
    Clears the recorded matches in match_data
    '''
    bust_match_data()
    return 'Busted'