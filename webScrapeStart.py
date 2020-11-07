import bs4
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup

my_url = 'https://lol.gamepedia.com/Doublelift'

uClient = uReq(my_url)
page_html = uClient.read()
uClient.close()
page_soup = soup(page_html, "html.parser")
#tables = page_soup.findAll("div", {"class":"tbody"})
page_soup.tbody.tr.th