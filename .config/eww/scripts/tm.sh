#!/bin/bash
SECONDS=5
i=1

while true
do
        echo "`date`: Loop $i"
        i=$(( $i+1 ))
        sleep $SECONDS
done
