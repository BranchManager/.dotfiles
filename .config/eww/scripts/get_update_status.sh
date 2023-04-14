statuss=$(checkupdates)
#echo -e $statuss | wc -l
sleep 5
dunstify "Updates: $statuss"
