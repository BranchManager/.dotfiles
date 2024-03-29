import requests 
from bs4 import BeautifulSoup

URL = "https://www.brainyquote.com/quote_of_the_day"
page = requests.get(URL)
soup = BeautifulSoup(page.text, 'html.parser')
#print(soup.prettify())
quotes = []
for quote in soup.find_all('a', class_='b-qt'):
    print(quote.text)
    quotes.append(quote.text)

# import random
# quote = random.choice(quotes) 
print(quotes)