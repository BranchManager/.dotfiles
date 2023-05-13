
#!/usr/bin/bash
tmp_dir="/home/branchmanager/.config/eww/images/icons/tmp_art"
place_holder_img="/home/branchmanager/.config/eww/images/icons/spotify_placeholder/warm_sunset.jpg"

tmp_cover_path=$tmp_dir/cover.png

link_path="/home/branchmanager/.config/eww/images/icons/tmp_art/link.txt"
#!/bin/bash

convert_time_to_seconds () {
  time_input=$1
 
  IFS=: read -r hours minutes seconds <<< "$time_input"
 
	
  if [[ -z "$seconds" ]]; then
	#if seconds is empty then swap the hours and minutes
	
    seconds=$minutes
    minutes=$hours
	
    total_seconds=$((minutes*60 + seconds))
  else
    total_seconds=$((hours*3600 + minutes*60 + seconds))
	
  fi
  #echo "$time_input is equal to $total_seconds seconds."
  echo "$total_seconds"
  
  
}


# Prompt the user and call the function
# echo "Enter the time in HH:MM:SS format (or MM:SS or M:SS):"
# read time_input
# convert_time_to_seconds "$time_input"



#rm $tmp_dir/*

#if the directory doesnt exist then make it
#however after this was run the first time the directory will always exists unless I manually delete it
if [ ! -d $tmp_dir ]; then
	mkdir -p $tmp_dir
fi
#echo $1


# player=$(playerctl -l | grep  -w spotify)
# if [[ -z "$player" ]]; then
# 	player=$(playerctl -l | grep spotifyd)
# fi


#echo $player
player="spotify"
player_status="$(playerctl -p $player status 2>&1)"
#echo "player status at beginning: $player_status"

#echo $player
#echo $player_status




case $1 in
	--cover)

		if [ "$player_status" == "Stopped" ] ||  [ "$player_status" == "No players found" ]; then
			eww update play_pause=
			echo $place_holder_img
		else
			artlink="$(playerctl metadata -p $player mpris:artUrl | sed -e 's/open.spotify.com/i.scdn.co/g')"


			current_link=$(cat $link_path)
			#echo $current_link
			#echo $artlink
			if [ "$current_link" == "$artlink" ]; then
				#echo "the same"
				#echo $current_link
				echo $tmp_cover_path
			else
				#echo "they dont"
				echo $artlink > $link_path
				curl -s "$artlink" --output $tmp_cover_path;
				echo $artlink
			fi
		fi;;
	--next)
		playerctl -p $player next;;
	--prev)
		playerctl -p $player previous;;
	--artist)
		if [ "$player_status" != "No players found" ]; then
			artist="$(playerctl metadata -p $player --format '{{ artist }}')"
			echo $artist
		else
			echo "No Artist either"
		fi;;

	--title)
		
		if [ $player_status == "No players found" ]; then
			echo "Spotify not playing"
		else
			title="$(playerctl metadata -p $player --format '{{ title }}')"
			echo $title
			#echo "hello2"
			#echo ${player_status}
		fi;;

	--album)
		album="$(playerctl metadata -p $player --format '{{ album }}')"
		echo $album;;
	
	--play_pause)
		if [ "$player_status" == "Playing" ] || [ "$player_status" == "Paused" ] ; then 
			echo "test"
			if [ "$player_status" == "Playing" ]; then
					
					playerctl -p $player pause
					
					eww update play_pause=
			elif [ "$player_status" == "Paused" ] ; then 
					#echo "play"
					playerctl -p $player play
					eww update play_pause=
					
			fi
		fi;;
	--shuffle_status)
		shuff="$(playerctl -p $player shuffle)"
		if [ "$shuff" == "Off" ]; then
			#playerctl -p $player shuffle on
			echo "spotify_shuff_off"
		elif  [ "$shuff" == "On" ]; then
			#playerctl -p $player shuffle Off
			echo "spotify_shuff_on"
		fi;;
	--shuffle_tog)
		shuff="$(playerctl -p $player shuffle)"
		echo $shuff
		shuff="$(playerctl -p $player shuffle)"
		if [ "$shuff" == "Off" ]; then
			playerctl -p $player shuffle on
			#echo "shuff_off"
		elif  [ "$shuff" == "On" ]; then
			playerctl -p $player shuffle Off
			#echo "shuff_on"
		#echo $shuff;;
			
		fi;;
	--loop_tog)
	loop="$(playerctl -p $player loop)"
		#echo $shuff
		if [ "$loop" == "None" ]; then
			playerctl -p $player loop playlist
			#eww update shuff_repeat_class2=spotify-shuffle-on
		elif  [ "$loop" == "Playlist" ] || [ "$loop" == "Track" ]; then
			#echo "loop playllist"
			playerctl -p $player loop none
			#eww update shuff_repeat_class2=spotify-off
			
		fi;;
	--loop_status)
		if [ "$player_status" != "No players found" ]; then
			loop="$(playerctl -p $player loop)"
			
			if [ "$loop" == "None" ]; then
			
				echo "spotify_repeat_off"
				#eww update shuff_repeat_class2=spotify-shuffle-on
			elif  [ "$loop" == "Playlist" ] || [ "$loop" == "Track" ]; then
				echo "spotify_repeat_on"
			fi
		else
			echo "spotify_repeat_off"
		fi ;;
	--progress)
		if [ "$player_status" != "No players found" ]; then
			progress="$(playerctl -p $player position $2)"
			echo $progress
		else
			echo "1"
		fi ;;
	--length)
		if [ "$player_status" != "No players found" ]; then
			time="$(playerctl -p $player metadata --format '{{ duration(mpris:length) }}')"
			seconds=$(convert_time_to_seconds "$time")
			
			# echo "Secondss: $secondss"
			echo $seconds
		else
			echo "100"
		fi;;
	--position)
		if [ "$player_status" != "No players found" ]; then
			time="$(playerctl -p $player position)"
			length="$(playerctl -p $player metadata --format '{{ duration(mpris:length) }}')"
			end_time=$(convert_time_to_seconds "$length")
			# result=$(awk "BEGIN {printf \"%.2f\", $time/$lenth*100}")
			# final_result=$(awk "BEGIN {printf \"%d\", $result*100}")
			result=$(echo "scale=2; $time / $end_time" | bc)
			final_result=$(echo "scale=0; $result * 100" | bc)
			# echo "end_time: $end_time"
			# echo $((time/end_time*100));;
			echo $time
		else
			echo "1"
		fi;;
	--volume)
		volume="$(playerctl -p $player volume "0.$2")"
		#playerctl -p spotify volume "0.$1"
		echo $volume;;
	--duration)
		if [ "$player_status" != "" ] && [ "$player_status" != "No players found" ]; then
			
			length="$(playerctl -p $player metadata --format '{{ duration(mpris:length) }}')"
			played="$(playerctl -p $player metadata --format '{{ duration(position) }}')"
			duration="$played/$length"
			echo $duration
		else
			echo "Nothing playing"
		fi;;
	
esac
# 凌
# 
#咽
#怜
#玲
#
#契 

#echo $current_link
#if [ ! -d $tmp_dir]
#if [ $(playerctl metadata -p spotify mpris:artUrl) ]; then
#	curl -s "$artlink" --output $tmp_cover_path;
#else cp ~/.config/eww/Main/images/music.svg $tmp_cover_path;
#fi



