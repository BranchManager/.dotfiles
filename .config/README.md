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
12. sudo pacman -S python-pipY

13. pip install shell-gpt==0.9.0

## Packages removed
1. yay -R 

### used this link for git bare repository
https://www.atlassian.com/git/tutorials/dotfiles

# SSH KEY GEN
`ssh-keygen -t rsa`

#
# Nvidia (with amd gpu) setup for machine learning

