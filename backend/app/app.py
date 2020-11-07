from flask import Flask
import json
import requests
from app.match_history import get_match_history
from app.summoner_names import get_summoner_names_from_player_name
from app.calculate import calculate

app = Flask(__name__)

@app.route('/health_check')
def health_check():
    return 'ok'

@app.route('/compare')
# player_a, player_b
def compare_players():
  player_a_match_history = get_match_history(player_a_name)
  player_b_match_history = get_match_history(player_b_name)
  win_rate = calculate(player_a_match_history, player_b_match_history)
  return json.dumps({
    win_rate: win_rate
  })
