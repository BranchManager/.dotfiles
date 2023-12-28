swayidle -w  \
	timeout 600 'hyprctl dispatch dpms off' \
	resume 'hyprctl dispatch dpms on' 
	#timeout 900 '~/.config/waybar/swaylock_min.sh' \
	#resume 'hyprctl dispatch dpms on'\
	
	#
	#timeout 10 '/home/branchmanager/.config/waybar/swaylock_after_id


	#may need a script to tun for sway lock to test if sway lock is already running
