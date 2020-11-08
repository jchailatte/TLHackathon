import json
import os

from riot import get_tons_of_matches, get_expanded_matches
import data
import util
import roleidentification
import time

BLANK_PRIMARIES = {
                'Skirmisher' : 0,
                'Juggernaut' : 0,
                'Battlemage' : 0,
                'Enchanter'  : 0,
                'Catcher'    : 0,
                'Artillery'  : 0,
                'Burst'      : 0,
                'Diver'      : 0,
                'Warden'     : 0,
                'Assassin'   : 0,
                'Marksman'   : 0,
                'Vanguard'   : 0,
                'Specialist' : 0
            }


# def get_player_names():
#     challenger_players = data.load_challenger()

#     name_list = []
#     for player in challenger_players:
#         name_list.append(player['summonerName'])

#     return name_list

# def scrape_player_games():
#     players = get_player_names()

#     players_matches = get_tons_of_matches(players)

def split(a, n):
    k, m = divmod(len(a), n)
    return (a[i * k + min(i, m):(i + 1) * k + min(i + 1, m)] for i in range(n))

def split_matches():
    match_ids = data.load_matches()
    num = 100
    chunks = split(match_ids, num)

    for i, chunk in enumerate(chunks):
        match_data_path = os.path.join(os.path.dirname(__file__), './data/match_data/matches_{}.json'.format(i))

        with open(match_data_path, 'w') as f:
            json.dump(chunk, f)
    

def scrape_match_data():
    get_match_ids = data.load_matches()

    expanded_matches = get_expanded_matches(get_match_ids)
    print("Completed {} matches".format(len(expanded_matches)))

def flatten_champion(champion_id, champion_id_to_custom):
    flat = []
    champion_custom = champion_id_to_custom[champion_id]
    flat.append(champion_custom['Damage'])
    flat.append(champion_custom['Toughness'])
    flat.append(champion_custom['Control'])
    flat.append(champion_custom['Mobility'])
    flat.append(champion_custom['Utility'])
    flat.append(champion_custom['Damage Type'])
    return flat


def order_team(tag_mapping, role_mapping, champion_id_to_custom):
    ordered_list = []
    ordered_list.extend(flatten_champion(role_mapping['TOP'], champion_id_to_custom))
    ordered_list.extend(flatten_champion(role_mapping['JUNGLE'], champion_id_to_custom))
    ordered_list.extend(flatten_champion(role_mapping['MIDDLE'], champion_id_to_custom))
    ordered_list.extend(flatten_champion(role_mapping['BOTTOM'], champion_id_to_custom))
    ordered_list.extend(flatten_champion(role_mapping['UTILITY'], champion_id_to_custom))
    ordered_list.append(tag_mapping['Skirmisher'])
    ordered_list.append(tag_mapping['Juggernaut'])
    ordered_list.append(tag_mapping['Battlemage'])
    ordered_list.append(tag_mapping['Enchanter'])
    ordered_list.append(tag_mapping['Catcher'])
    ordered_list.append(tag_mapping['Artillery'])
    ordered_list.append(tag_mapping['Burst'])
    ordered_list.append(tag_mapping['Diver'])
    ordered_list.append(tag_mapping['Warden'])
    ordered_list.append(tag_mapping['Assassin'])
    ordered_list.append(tag_mapping['Marksman'])
    ordered_list.append(tag_mapping['Vanguard'])
    ordered_list.append(tag_mapping['Specialist'])
    return ordered_list


def parse_extended_matches():
    extended_match_data_path = os.path.join(os.path.dirname(__file__), './data/extended_match_data/')
    champion_id_to_custom = util.get_ids_to_custom()
    champion_roles = roleidentification.pull_data()

    callapsed_data = []
    for filename in os.listdir(extended_match_data_path):
        expanded_matches_path = os.path.join(os.path.dirname(__file__), './data/extended_match_data/{}'.format(filename))
        expanded_matches = json.load(open(expanded_matches_path, 'r'))
    
        for match_id, extended_data in expanded_matches.items():
            
            if extended_data['queueId'] not in [400, 420, 440]:
                print(extended_data['queueId'])
                continue
            
            team_100_champions = []
            team_100 = BLANK_PRIMARIES.copy()

            team_200_champions = []
            team_200 = BLANK_PRIMARIES.copy()

            # Grab champions and assign roles
            for participant in extended_data['participants']:
                team_id = participant['teamId']
                champion_id = participant['championId']

                custom = champion_id_to_custom[champion_id]

                if team_id == 100:
                    team_100[custom['Primary']] += 1
                    team_100_champions.append(champion_id)
                if team_id == 200:
                    team_200[custom['Primary']] += 1
                    team_200_champions.append(champion_id)

            # print(json.dumps(team_100))
            # print(json.dumps(team_200))

            team_100_roles = roleidentification.get_roles(champion_roles, team_100_champions)
            team_200_roles = roleidentification.get_roles(champion_roles, team_200_champions)

            team_100_win = extended_data['teams'][0]['win'] == "Win"
            
            team_100_str = ','.join( [str(num) for num in order_team(team_100, team_100_roles, champion_id_to_custom)] )
            team_200_str = ','.join( [str(num) for num in order_team(team_200, team_200_roles, champion_id_to_custom)] )
            # print("{} vs {} is {}".format(team_100_str, team_200_str, str(team_100_win)))

            callapsed_data.append("{},{},{}".format(team_100_str, team_200_str, str(int(team_100_win))))
            callapsed_data.append("{},{},{}".format(team_200_str, team_100_str, str(int(not team_100_win))))

            # print(len(callapsed_data))
            # print(callapsed_data[0])
            # print(callapsed_data[1])
            # time.sleep(1000)
    
    data.save_callapsed_data(callapsed_data)
        

def extended_matches_stats():
    expanded_matches = data.load_extended_matches()

    print("{} matches".format(len(expanded_matches)))

# split_matches()
# scrape_match_data()
# extended_matches_stats()
parse_extended_matches()