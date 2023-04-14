isopen=$( eww windows | grep mainbg | grep *mainbg )
echo $isopen

if [ -z "$isopen" ]
then
    eww open-many mainbg profile weather notif_area date sys_monitor other_apps music
    python3 /home/branchmanager/.config/eww/scripts/weather.py
    python3 /home/branchmanager/.config/eww/scripts/Quote.py
else
    eww close-all
fi