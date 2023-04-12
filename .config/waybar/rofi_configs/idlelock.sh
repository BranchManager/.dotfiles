swayidle -w  \
	timeout 605 'hyprctl dispatch dpms off' \
	timeout 500 'swaylock\
	--image /home/branchmanager/Pictures/Wallpapers/Snow-valley.jpg \
	--indicator-radius 100 \
	--indicator-thickness 7 \
	--ring-color bb00cc \
	--key-hl-color ca9ee6 \
	--line-color ca9ee6 \
	--inside-color 232634 \
	--separator-color 00000000 \
	--font "Ubuntu Nerd Font" \
	 --text-color 8caaee \
	 -f' \
	resume 'hyprctl dispatch dpms on'
	#timeout 10 '/home/branchmanager/.config/waybar/swaylock_after_id
