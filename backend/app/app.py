from flask import Flask, request, jsonify
import json
import requests

from riot import get_matches_between
from summoner_names import get_summoner_names_from_player_name
from calculate import calculate
from liquidpedia import get_players


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

    # get summoner names for player b

    # get matches between all permutations (without duplicates)

    # calculate win loss

    matches = get_matches_between(player_a_name, player_b_name)
    print(len(matches))

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
    return jsonify(get_players())


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


@app.route('/test')
def test():
    return jsonify(get_match_history("golang"))