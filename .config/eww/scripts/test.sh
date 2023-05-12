#!/bin/bash

#playerctl -p spotify volume "0.$1"

convert_time_to_seconds () {
  time_input=$1
 
  IFS=: read -r hours minutes seconds <<< "$time_input"
  echo "chickin Hours: $hours"
  echo "checking Minutes: $minutes"
  echo "checking Seconds: $seconds"
  if [ -z "$seconds" ]; then
	#if seconds is empty then swap the hours and minutes
	echo "seconds is empty"
    # minutes=$hours
    seconds=$minutes
    minutes=$hours
	echo "Minutes: $minutes"
	echo "Seconds: $seconds"
	echo "Hours: $hours"
    total_seconds=$((minutes*60 + seconds))
  else
    total_seconds=$((hours*3600 + minutes*60 + seconds))
	
  fi
  echo "$time_input is equal to $total_seconds seconds."
  return $total_seconds
  
}


# Prompt the user and call the function
echo "Enter the time in HH:MM:SS format (or MM:SS or M:SS):"
read time_input
convert_time_to_seconds "$time_input"