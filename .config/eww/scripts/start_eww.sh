#!/bin/bash

isopen=$( eww windows | grep main | grep *main )



if [ -z "$isopen" ]
then
    focused_array=($(hyprctl monitors | grep -e ID -e focused))

    len="${#focused_array[@]}"
  

    for (( i=0; i<$len; i++ ))
    do
        if [[ "${focused_array[$i]}" == "yes" ]]
        then
          
            eww_monitor="main_"
            monitor_num="${focused_array[$i-2]:0:1}"
            eww_monitor+=$((monitor_num))
            eww open $eww_monitor
        fi
    done
   
 
else
    eww close-all
fi