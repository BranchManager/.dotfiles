#!/bin/bash
end=$(hyprctl -j monitors | jq 'length')
for ((i=1 ; i<=$end ; i++));
do 
    echo "$i"
    focused=$(hyprctl -j monitors | jq ".[$((i-1))] | .focused")

    if [ "$focused" == "true" ]
    then
    echo "$i here"
        ags -r "on_close_launcher(true, $((i-1)))"
        echo "on"
    else
        echo "off"
    fi 
done
