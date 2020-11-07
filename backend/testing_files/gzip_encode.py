import gzip
import os
import shutil

empty_json_path = os.path.join(os.path.dirname(__file__), './empty_json.json')
destination = os.path.join(os.path.dirname(__file__), './match_data.json.gz')

with open(empty_json_path, 'rb+') as f_in:
    with gzip.open(destination, 'wb+') as f_out:
        shutil.copyfileobj(f_in, f_out)