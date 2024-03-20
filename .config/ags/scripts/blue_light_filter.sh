#!/bin/bash

#This file just checks if the wlsunset is running or not
#If it is running, it returns "on" else "off"
# using ps in the js code results in some type of environment error
whats_running=$(ps -x | grep -c wlsunset)


if [ $whats_running -gt 1 ]
then
    echo "on"
else
    echo "off"
fi
