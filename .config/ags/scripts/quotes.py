"""
example quote -Quote Author Name
"""

import requests
from json import loads
import json


def return_quote():
    response = requests.get("https://zenquotes.io/api/random")
    json_data = loads(response.text)
    print(json.dumps(json_data, indent=4)) 
    quote = (
        json_data[0]["q"] + " -" + json_data[0]["a"]
    )  # aligning the quote and it's author name in one string
    return quote


quote = return_quote()
print(quote)