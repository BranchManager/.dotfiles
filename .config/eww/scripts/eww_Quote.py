#from brainyquote_api import quote

from statistics import quantiles
from pybrainyquote import *
import os
import subprocess as subp

Quote.today(topic="Love")
Quote_tosee=Quote.today().content
author=Quote.today().author
#print(repr(Quote_tosee))
Quoteasis = Quote_tosee.replace("\n","")
#print(Quote_tosee.replace("\n",""))
author = author.replace("\n","")

#if len(Quote_tosee) > 20 :
#print(Quoteasis)
#Quoteasis = "Life before death, strength before weakness, journey before destination."
#print(len(Quoteasis))
Orig_Quote = Quoteasis
# if len(Quoteasis) > 51:
#     Quoteasis = Quoteasis
#     #[0:60]
#     #quotes = "...  "
  
#     #print(Quoteasis) the limit was 51
# else:
#    Quoteasis = Quoteasis


#print("(Quote_of_day :q \""+Quoteasis+ "\" :author \"-" + author +"\" )")
subp.run(["eww","update","qq="+Quoteasis])
subp.run(["eww","update","auth="+author])
#print(Quoteasis)
#print(author)
file = open("/home/branchmanager/.config/eww/scripts/quote_of_theDay.txt","w")
file.write(Orig_Quote)
