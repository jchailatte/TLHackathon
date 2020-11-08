import hashlib
import data
import json

def hash(*argv):
    hash_key = ''
    for arg in argv:
        hash_key += str(arg)
    return hashlib.md5(hash_key.encode()).hexdigest()


champions = data.load_champions()
def get_champion_to_tags():
    tags = {}
    for champion in champions:
        champion_id = int(champions[champion]['key'])
        tags[champion_id] = champions[champion]['tags']
    
    return tags

def get_tags():
    tags = set()
    for champion in champions:
        for tag in champions[champion]['tags']:
            tags.add(tag)
    return list(tags)

champions_custom = data.load_champions_custom()
def get_ids_to_custom():
    name_to_id = {}
    for champion in champions:
        name_to_id[champion] = int(champions[champion]['key'])
    
    ids_to_custom = {}
    for champion in champions_custom:
        ids_to_custom[name_to_id[champion['Champion'].replace(' ','')]] = champion

    return ids_to_custom

def get_primaries():
    primaries = set()
    for champion in champions_custom:
        primary = champion['Primary']
        primaries.add(primary)
    return list(primaries)



def convert_names_to_ids(names):
    name_to_id = {}
    for champion in champions:
        name_to_id[champion] = int(champions[champion]['key'])
    ids = []
    for name in names:
        ids.append(str(name_to_id[name]))
    print(','.join(ids))

convert_names_to_ids([ 'Janna', 'Sona', 'Lulu', 'Soraka', 'Nami' ])