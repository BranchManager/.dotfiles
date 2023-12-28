#!/bin/bash



if [ "$1" = "--power" ]; then
    focused_array=($(hyprctl monitors | grep -e ID -e focused))

    len="${#focused_array[@]}"
  

    for (( i=0; i<$len; i++ ))
    do
        if [[ "${focused_array[$i]}" == "yes" ]]
        then
          
            eww_monitor="main_"
            monitor_num="${focused_array[$i-2]:0:1}"
            eww_monitor+=$((monitor_num))
            eww_monitor+="_power"
            eww open $eww_monitor 
        fi
    done
   
fi

if [ "$1" = "--powe-close" ]; then

    #if not empty
    if [ -n "$( eww windows | grep *main | grep power)" ]
    then 

        eww close main_0_power
        eww close main_1_power
        eww close main_2_power
    else 
        focused_array=($(hyprctl monitors | grep -e ID -e focused))

        len="${#focused_array[@]}"
    

        for (( i=0; i<$len; i++ ))
        do
            if [[ "${focused_array[$i]}" == "yes" ]]
            then
            
                eww_monitor="main_"
                monitor_num="${focused_array[$i-2]:0:1}"
                eww_monitor+=$((monitor_num))
                eww_monitor+="_power"
                eww open $eww_monitor
            fi
        done
    fi
   
fi


isopen=$( eww windows | grep main | grep *main )

if [ "$1" = "--start-end" ]
then

        #if ther eis nothing in this variable then start opening shit
    if [ -z "$isopen" ] 
    then
        #for loop grabs monitor thats currently in focus using the hyprland tools
        focused_array=($(hyprctl monitors | grep -e ID -e focused))

        len="${#focused_array[@]}"
    

        for (( i=0; i<$len; i++ ))
        do
            if [[ "${focused_array[$i]}" == "yes" ]]
            then
                #the above lines from the "focussed_array to 'len=' grabe the monitor that has the output listed below as an example"
                #Monitor DP-2 (ID 1):
	            #focused: yes

                eww_monitor="main_"
                monitor_num="${focused_array[$i-2]:0:1}"
                eww_monitor+=$((monitor_num))
                eww update anim_open_ostg=true & #this is for the slide out animation

                #echo "THE MONITOR WE ARE OPENING and number"
                #echo $eww_monitor
                # echo $monitor_num

                #once we grab the ID we make the string "main_1 (for example) ie main_# and our eww code will open the window on that monitor"
                eww open $eww_monitor &
                python3 ~/.config/eww/scripts/notion_test.py &
                python3 ~/.config/eww/scripts/weather.py & 
                echo "WE finally got here"
                
                python3 ~/.config/eww/scripts/eww_Quote.py
                echo "WE finally got here 2"
                eww update rev_ostg=true &
            fi
        done
    
    
    else
        eww update anim_open_ostg=false &
        eww update rev_ostg=false &
        sleep 0.4
        eww close-all
    fi
fi