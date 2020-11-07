import atexit
import gzip
import json
import os


champion_data_path = os.path.join(os.path.dirname(__file__), './data/champion_data.json')
champion_data = json.load(open(champion_data_path))['data']

def champion_id_to_name(champion_id):
    for name, data in champion_data.items():
        if str(champion_id) == data['key']:
            return name
    return None


match_data_path = os.path.join(os.path.dirname(__file__), './data/match_data.json.gz')
match_data = json.load(gzip.open(match_data_path, 'rb'))
print(len(match_data))

def get_match_from_file(match_id):
    return match_data.get(str(match_id))


def put_match_to_file(match_id, match_data_new):
    match_data[match_id] = match_data_new


def bust_match_data():
    match_data.clear()


def exit_handler():
    with gzip.open(match_data_path, 'wb+') as f:
        f.write(str.encode(json.dumps(match_data)))

atexit.register(exit_handler)