
#!/usr/bin/bash
tmp_dir="/home/branchmanager/.config/eww/images/icons/tmp_art"
tmp_cover_path=$tmp_dir/cover.png

link_path="/home/branchmanager/.config/eww/images/icons/tmp_art/link.txt"


#rm $tmp_dir/*

#if the directory doesnt exist then make it
#however after this was run the first time the directory will always exists unless I manually delete it
if [ ! -d $tmp_dir ]; then
	mkdir -p $tmp_dir
fi
#echo $1
player_status="$(playerctl -p spotify status)"

case $1 in
	--cover)
		artlink="$(playerctl metadata -p spotifyd mpris:artUrl | sed -e 's/open.spotify.com/i.scdn.co/g')"


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
		fi ;;

	--artist)
		artist="$(playerctl metadata -p spotify --format '{{ artist }}')"
		echo $artist;;

	--title)
		
		if [ -z "$player_status" ]; then
			echo "Spotify not playing"
		else
			title="$(playerctl metadata -p spotify --format '{{ title }}')"
			echo $title
			#echo "hello2"
			#echo ${player_status}
		fi;;

	--album)
		album="$(playerctl metadata -p spotify --format '{{ album }}')"
		echo $album;;
	
	--play_pause)
		if [ "$player_status" == "Playing" ] || [ "$player_status" == "Paused" ] ; then 
			echo "test"
			if [ "$player_status" == "Playing" ]; then
					
					playerctl -p spotify pause
					
					eww update play_pause=契
			elif [ "$player_status" == "Paused" ] ; then 
					#echo "play"
					playerctl -p spotify play
					eww update play_pause=
					
			fi
		fi;;
	--shuffle_tog)
		shuff="$(playerctl -p spotify shuffle)"
		echo $shuff
		if [ "$shuff" == "Off" ]; then
			playerctl -p spotify shuffle on
			eww update shuff_repeat_class=spotify-shuffle-on
		elif  [ "$shuff" == "On" ]; then
			playerctl -p spotify shuffle Off
			eww update shuff_repeat_class=spotify-off
			
		fi;;
	--loop_tog)
	loop="$(playerctl -p spotify loop)"
		echo $shuff
		if [ "$loop" == "None" ]; then
			playerctl -p spotify loop playlist
			eww update shuff_repeat_class2=spotify-shuffle-on
		elif  [ "$loop" == "Playlist" ] || [ "$loop" == "Track" ]; then
			echo "loop playllist"
			playerctl -p spotify loop none
			eww update shuff_repeat_class2=spotify-off
			
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