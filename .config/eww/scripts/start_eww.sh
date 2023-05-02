#!/bin/bash

isopen=$( eww windows | grep main | grep *main )
echo $isopen



if [ -z "$isopen" ]
then
    focused_array=($(hyprctl monitors | grep -e ID -e focused))

    len="${#focused_array[@]}"
    echo "Length: $len"

    for (( i=0; i<$len; i++ ))
    do
        if [[ "${focused_array[$i]}" == "yes" ]]
        then
            echo "yes"
            echo $i
            echo "${focused_array[$i]}"
            echo $((i-1))
            eww_monitor="main_"
            #echo "eww_monitor: $eww_monitor"
            monitor_num="${focused_array[$i-2]:0:1}"
            eww_monitor+=$((monitor_num))
            echo "eww_monitor: $eww_monitor"
            eww open $eww_monitor
        fi
    done
    #eww open-many mainbg profile weather notif_area date sys_monitor other_apps music
    #python3 /home/branchmanager/.config/eww/scripts/weather.py
    #python3 /home/branchmanager/.config/eww/scripts/Quote.py
    echo "Test"
else
    eww close-all
fi