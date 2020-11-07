import gzip
import json
import os

source = os.path.join(os.path.dirname(__file__), './match_data.json.gz')

with gzip.open(source, 'rb') as f:
    file_content = f.read()
    data = json.loads(file_content)
    print(json.dumps(data))