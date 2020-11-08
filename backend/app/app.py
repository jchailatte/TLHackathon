from flask import Flask, request, jsonify, abort
from itertools import product
import json
import requests
import ml


app = Flask(__name__)


@app.route('/health_check')
def health_check():
    return 'OK'

@app.route('/compare_teams')
def compare_teams():
    team_1 = request.args.get('team_1')
    team_2 = request.args.get('team_2')

    if len(team_1) == 0 or len(team_2) == 0:
        abort(400)

    team_1_split = [int(i) for i in team_1.split(',')] 
    team_2_split = [int(i) for i in team_2.split(',')] 

    ret = {}
    ret['win_chance'] = ml.calculate_win_team_1_chance(team_1_split, team_2_split)
    
    return jsonify(ret)