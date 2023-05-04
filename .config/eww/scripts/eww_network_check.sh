#!/bin/bash

case $1 in
    
     --toggle_wifi)
        echo "test"
        if [ "disabled" == $(nmcli radio wifi) ]
        then 
            echo "hello"
            nmcli radio wifi on
        else
            echo "hello2"
            nmcli radio wifi off
        fi;;

esac


network_type=$(nmcli -g type con show --active | grep "ethernet")
if [ "$network_type" ] && [ "enabled" == $(nmcli radio wifi) ]
then
    echo "󱛃"
    exit 0
elif [ "$network_type" ]
then
    #network_type=$(nmcli -g type con show --active | grep "wifi")
    echo "󰈀"
    exit 0
elif [ "enabled" == $(nmcli radio wifi)  ]
then
    echo ""

else
    echo "󰤮"
fi



        