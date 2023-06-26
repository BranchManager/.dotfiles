#!/bin/bash
function level {
    echo $(pactl get-sink-volume @DEFAULT_SINK@ | grep Volume | awk '{print $5}' | tr % " ")
}


function lower {
    echo "$LOWER_VOLUME_LOCK"
    open_eww_vol
    pactl set-sink-volume @DEFAULT_SINK@ -5%
    echo $(ps -x | pgrep "eww_volume_bar" | wc -l)

    if [ $(ps -x | pgrep "eww_volume_bar" | wc -l) -gt 2 ]; then
        pkill -f "eww_volume_bar.sh --down"
    fi
    close_vol_bar 
    #update
}
function close_vol_bar {
    sleep 2
    eww close main_0_vol
    eww close main_1_vol
    eww close main_2_vol
    

}
function open_eww_vol(){
    
    focused_array=($(hyprctl monitors | grep -e ID -e focused))

    len="${#focused_array[@]}"

    
    for (( i=0; i<$len; i++ ))
    do
        if [[ "${focused_array[$i]}" == "yes" ]]
        then
        
            eww_monitor="main_"
            monitor_num="${focused_array[$i-2]:0:1}"
            eww_monitor+=$((monitor_num - 1))
            eww_monitor+="_vol"
            echo "This the monitor"
            echo "$eww_monitor"
            eww open $eww_monitor 
        fi
    done


}

function raise {

    echo "$RAISE_VOLUME_LOCK"
    echo $(ps -x | pgrep "eww_volume_bar" | wc -l)
    open_eww_vol
    pactl set-sink-volume @DEFAULT_SINK@ +5%
    
    if [ $(ps -x | pgrep "eww_volume_bar" | wc -l) -gt 2 ]; then
        pkill -f "eww_volume_bar.sh --up"
    fi
    close_vol_bar 
    
    #update
}
function set {
    pactl set-sink-volume @DEFAULT_SINK@ $1"%"
    eww update volume="$(get)"
}

function update {
    eww update volume="$(get)"

    #below needs to be changed  
    ~/.config/eww/scripts/osd $(icon) $(level)
}
if [[ $1 == '--down' ]]; then lower; fi
if [[ $1 == '--up' ]]; then raise; fi
if [[ $1 == '--level' ]]; then level; fi
if [[ $1 == '--set' ]]; then set $2; fi