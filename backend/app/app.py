from flask import Flask, request, jsonify
import json
import requests
from match_history import get_match_history
from summoner_names import get_summoner_names_from_player_name
from calculate import calculate


app = Flask(__name__)


@app.route('/health_check')
def health_check():
    return 'ok'


@app.route('/compare', methods=['GET'])
def compare_players():

  player_a_name = request.args['player_a']
  player_b_name = request.args['player_b']

  ret = {}

  player_a_match_history = get_match_history(player_a_name)
  player_b_match_history = get_match_history(player_b_name)

  ret['win_rate'] = calculate(player_a_match_history, player_b_match_history)
  return jsonify(ret)


@app.route('/test')
def test():
    return lol_api_request("lol/summoner/v4/summoners/by-name/golang")
