import requests
from bs4 import BeautifulSoup

page = requests.get('https://lol.gamepedia.com/Doublelift')

soup = BeautifulSoup(page.content, 'html.parser')

player_box = soup.find(id='infoboxPlayer')
soloqueue_box = player_box.find_all('tr')[12]
soloqueue_ids = soloqueue_box.find_all('td')[1]

print(soloqueue_ids)