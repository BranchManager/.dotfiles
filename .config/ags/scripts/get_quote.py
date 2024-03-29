import random
import requests




# Define a counter variable
counter = 0


# Make a request to the ZenQuotes API
response = requests.get('https://zenquotes.io/api/today')
data = response.json()[0]
quote = data['q'] + '; - ' + data['a']


print(quote)
        
       