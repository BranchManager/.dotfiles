#!/bin/bash

whats_running=$(ps -x | grep -c wlsunset)

if [ "$#" != 0 ] && [ $1 == "--toggle" ]
then
    if [ $whats_running -gt 1 ]
    then
        killall wlsunset
    else
        wlsunset -l 33.9 -L -89.3
    fi
fi



if [ $whats_running -gt 1 ]
then
    echo "on"
else
    echo "off"
fi