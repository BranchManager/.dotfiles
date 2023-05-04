#!/bin/bash
sensors_tctl=$(sensors | grep Tctl | awk '{print $2}' | sed 's/+//g'| awk -F'.' '{print $1}')
echo $((sensors_tctl-10))