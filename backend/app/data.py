import json
import os


champion_data_path = os.path.join(os.path.dirname(__file__), './data/champion_data.json')
champion_data = json.load(open(champion_data_path))['data']


def champion_id_to_name(champion_id):
    for name, data in champion_data.items():
        if str(champion_id) == data['key']:
            return name
    return None