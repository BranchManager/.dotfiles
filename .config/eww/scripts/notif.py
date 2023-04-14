import subprocess as subp
import requests
import json
import sys
import os

#def get_icon(icon):

dunst_hist = subp.run(["dunstctl","history"], capture_output=True, text=True)
#subp.run(["eww","update","get_noti=(box :space-evenly \"true\" :vexpand \"false\" :orientation \"v\" (label :text \"hello in shell\" :valign \"center\" :class \"weather_label\" )(label :text \"hello in shell\" :valign \"center\" :class \"weather_label\" ))"])
#print("(notifcard)")
#print("(box :space-evenly \"true\" :vexpand \"false\" :orientation \"v\" (notifcard)(notifcard))")
#print(dunst_hist.stdout)
dunst_json = json.loads(dunst_hist.stdout)
#(label :text \"hello in shell\" :valign \"center\" :class \"weather_label\" )(label :text \"hello in shell\" :valign \"center\" :class \"weather_label\" )
#print(dunst_json["data"][0][1])
final_string = "(box :space-evenly \"false\" :orientation \"v\" :width 200"
button_script = "/home/branchmanager/.config/eww/scripts/toggle_fullQuote.sh reveal"
for i in range(len(dunst_json["data"][0][0:10])):
    #print(len(dunst_json["data"][0][0:3]))
    #if(dunst_json["data"][0][i] != 0):
    updated_button = button_script + str(i)
    message = dunst_json["data"][0][i]["message"]["data"]
    summary = dunst_json["data"][0][i]["summary"]["data"]
    appname = dunst_json["data"][0][i]["appname"]["data"]
    button_index = str(i)
    #print(message + summary + appname)
    message = message.replace("\n", "")
    #print(message)
    icon_path = "/home/branchmanager/.config/eww/images/icons/"+appname+".svg"

    if(not(os.path.exists(icon_path))):
        icon_path = "/home/branchmanager/.config/eww/images/icons/bellnotif.svg"
    message = message.replace('"','')
    summary = summary.replace('"','')
    message = message.replace('\n',';')
    summary = summary.replace('\n',';')
    message = message.replace('-&gt;','->')
    summary = summary.replace('-&gt;','->')
    next_notif = "(notifcard :rev \"${reveal"+button_index+"}\" :appname \""+appname+ "\" :icon_path \""+icon_path+"\" :summary \""+summary +"\" :message \""+message+"\" :butt \""+button_script+button_index+"\" )"
    final_string = final_string + next_notif
    
    #if i == 6:
    #    break
   #print(icon_path)
    #print(next_notif +"\n")
    #break
    #print(final_string)
    #final_string = ""
    #icon_class = appname+"_class"
    #else:
    #    print("nada")
print(final_string + ")")   

'''(box :space-evenly "false" :orientation "v" :width 200
(notifcard :rev "${reveal0}" 
:appname "Thunderbird" 
:icon_path "/home/branchmanager/.config/eww/images/icons/Thunderbird.svg"
:summary "acebranchmanager@gmail.com received 195 new messages" 
:message "acebranchmanager@gmail.com received 195 new messages "Vestiges" by Ángel García from Poem-a-Day | Poets.org" 
:butt "/home/branchmanager/.config/eww/scripts/toggle_fullQuote.sh reveal0" )
(notifcard :rev "${reveal1}" :appname "discord" :icon_path "/home/branchmanager/.config/eww/images/icons/discord.svg" :summary "Exabyte (#counting)" :message "Exabyte (#counting) 1424" :butt "/home/branchmanager/.config/eww/scripts/toggle_fullQuote.sh reveal1" ))

#the below worked but the above didn't I bet it had to do with the quotes in the message. 
#quotes in any part may be an issue
(box :space-evenly "false" :orientation "v" :width 200
(notifcard :rev "${reveal0}" 
:appname "Thunderbird" 
:icon_path "/home/branchmanager/.config/eww/images/icons/Thunderbird.svg" 
:summary "acebranchmanager@gmail.com received 3 new messages" 
:message "acebranchmanager@gmail.com received 3 new messages Your Goulet Pens Order S1528786 is ready to be shipped! from The Goulet Pen Company" 
:butt "/home/branchmanager/.config/eww/scripts/toggle_fullQuote.sh reveal0" )
(notifcard :rev "${reveal1}" :appname "discord" :icon_path "/home/branchmanager/.config/eww/images/icons/discord.svg" :summary "haylagrace13" :message "haylagrace13 hi bitch" :butt "/home/branchmanager/.config/eww/scripts/toggle_fullQuote.sh reveal1" ))'''
'''for loop up until 4th notification
        check if it exists
            grab appname
            summary
            and message
            
            if appname has icon
                get icon path using appname
                maybe use a function here that returns the path along with the class name
                the different icons will need to be scales accordingly
            else 
                use a generic bell icon or something
        
        using appname summary message and iconpath create notifcard[] eww widget fuunction as string
        add this string to an appended string of notifcard widgets ex: "(nofifcard[:icon path :name appname :summ.....]) (notifcard[....])"
            
        //somewhere i need to check if the notification caome from a rondom app or one of the apps I have icosn for
        //maybe somewhere add button arg too so we know what reveal bool to change   
            '''