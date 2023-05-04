#!/bin/bash

if [ "$#" != 0 ] && [ $1 == "--open-blueman" ]
then
    echo "test"
    blueman-manager
fi

enabled_or_not=$(systemctl status bluetooth.service | grep enabled)
if [ "$enabled_or_not" ]
then
    echo "BT_ON"
else
    echo "BT_OFF"
fi
