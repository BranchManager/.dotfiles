#!/bin/bash
printf "%.0f" $(free -m | grep Mem | awk '{print ($3/$2)*100}')
