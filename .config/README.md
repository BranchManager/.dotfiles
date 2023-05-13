# OS distro is Manjaro
_____________________________________________________________
# Color Theme
Catpuccin
# Winodw manager
### Hyprland
install method has moved to the pacman community repository
### Apps using color scheme
1. Vscode
    - Download Extenstion
2. Firefox
    - Extention
3. Edge (I like bing chat)
    - Using chrome extension
4. Thunar

5. Nautlus
    - Downloaded theme from [here](!https://www.xfce-look.org/p/1715554/)
    - copied the theme (after extracting) to `~/.config/gtk-4.0 `)
    ~~~
    $ cp -r ~/Downloads/catpuccin_mocha_thunar\(gtk\)/Catppuccin-Mocha-BL/gtk-4.0/ ~/.config/
    ~~~
    - For GTK 3 
        - Move the themes folder you extracted to `~/.themes` folder. Create the folder if you have to. If you use yay to install them then this is not necesary.
        - Then use `gnome-tweaks` to set the back ground theme.
    Note: may be wise to backup original configuration. Also may need to log out and back in

# Change shell
Since I am on manjaro and it uses zsh by default in gnome I changed it to bash using
~~~
$ chsh -s /bin/bash $USER
~~~

# File Manager
1. Main File Manager
    - thunar
    ~~~
    $ Pacman -S Thunar
    ~~~
    - changing terminal to kitty
        Went the the edit section => Configure custom Actions => Edit the "open Terminal here" action command from `exo-open --working-directory %f --launch TerminalEmulator` to `kitty --working-directory %f`
    - install extract archive for thunar
        `
        sudo pacman -S thunar-archive-plugin`

2. Nautilus
    - Came with default gnome configuration

## Other packages downloaded
1. yay -S xdg-desktop-portal-hyprland-git
2. yay -S waybar-hyprland-git
3. sudo pacman -S tailscale
    - additional sign in required with `sudo systemctl start tailscaled `
    - to use tailescale in way bar sqript you need jq `sudo pacman -S jq`
4. sudo pacman -S pavucontrol
- for volume control
5. sudo pacman -S libnotify
    - to use notify-send
- to test notifications
6. yay -S eww-wayland
7. sudo pacman -S rofi
8. sudo pacman -S bluez-utils
9. sudo pacman -S bluez
10. sudo pacman -S blueman
11. yay -S wlsunset
12. sudo pacman -S python-pip
13. sudo yay -S ttf-ubuntu-nerd
14. sudo pacman -S swaybg
15. pip3 install python-dateutil
16. pip3 install geocoder
17. pip3 install geopy
18. spicetify-cli
19. yay -S spicetify-themes-git
- Before applying Spicetify, you need to gain write permission on Spotify files, by running command:
    ```
    sudo chmod a+wr /opt/spotify
    sudo chmod a+wr /opt/spotify/Apps -R
    ```
- Then, run command to apply the new theme:
    ```
    cd "$(dirname "$(spicetify -c)")/Themes/Dribbblish"
    spicetify config current_theme Dribbblish color_scheme base
    spicetify config inject_css 1 replace_colors 1 overwrite_assets inject_theme_js 1
    spicetify apply
    ```
20. suod pacman -S bc
- needed for the spotify bar widget to work
21. yay -S spotify-tui
22. yay -S spotifyd
 - enable spotifyd service
    ```
    $ systemctl --user enable spotifyd.service
    ```
23. yay -S icat   (for viewing imagies in terminal)
24. yay -S catppuccin-gtk-theme-mocha catppuccin-gtk-theme-macchiato catppuccin-gtk-theme-frappe catppuccin-gtk-theme-latte
- catpuccin for gtk theme
25. pip install shell-gpt==0.9.0
- I had to modify my path in order for this to work by adding ~/.local/bin to my path
26. pacman -Syu sddm qt5-graphicaleffects qt5-svg qt5-quickcontrols2 
27. yay -S sddm-thme-corners-git
- mkdir /etc/sddm.conf.d
- cp /usr/lib/sddm/sddm.conf.d/default.conf /etc/sddm.conf.d/
28. pip3 install pybrainyquote
- for the quote widget

## Packages removed
1. yay -R 

### used this link for git bare repository
https://www.atlassian.com/git/tutorials/dotfiles

# SSH KEY GEN
`ssh-keygen -t rsa`

#
# Nvidia (with amd gpu) setup for machine learning

