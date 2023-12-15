# This README is a work in progress 
# preview of my desktop
![desktop](https://github.com/BranchManager/.dotfiles/blob/main/Pictures/desktop_showcase.png)

# For Manjaro 

_____________________________________________________________
# Color Theme
**_NOTE:_** Things may need to be done according to  what distor you have. I also started with a wayland gnome environent and then switched to hyprland so some things may be different.

Catpuccin
# Winodw manager
## Hyprland
`yay -S hyprland`

# Change shell
Since I am on manjaro and it uses zsh by default in gnome I changed it to bash using
~~~
$ chsh -s /bin/bash $USER
~~~


## Packages downloaded
1. What I installed with pacman
```bash
sudo pacman -S tailscale pavucontrol libnotify rofi bluez-utils bluez blueman python-pip swaybg bc sddm qt5-graphicaleffects qt5-svg qt5-quickcontrols2 slurp jq thunar thunar-archive-plugin ccid opensc pkgconf
```
2. What I installed with yay
```bash
yay -S xdg-desktop-portal-hyprland-git waybar-hyprland-git eww-wayland wlsunset ttf-ubuntu-nerd spicetify-themes-git catppuccin-gtk-theme-mocha catppuccin-gtk-theme-macchiato catppuccin-gtk-theme-frappe catppuccin-gtk-theme-latte icat sddm-thme-corners-git swaylock swayidle grim
```
3. What I installed with pip
```bash 
pip3 install python-dateutil geocoder geopy pybrainyquote
```
4. what I removed
```bash 
pacman -R xdg-desktop-portal-gnome libva-vdpau-driver tumbler
```
<details>
<summary> Details on what I installed </summary>

1. yay -S xdg-desktop-portal-hyprland-git
2. yay -S waybar-hyprland-git
    - what I installed to get waybar to work properly on hyprland
3. sudo pacman -S tailscale
    - additional sign in required with `sudo systemctl start tailscaled `
    - to use tailescale in way bar sqript you need jq `sudo pacman -S jq`
4. sudo pacman -S pavucontrol
    - for volume control
5. sudo pacman -S libnotify
    - to use notify-send
    - to test notifications
6. yay -S eww-wayland
 - for eww widgets
7. sudo pacman -S rofi
8. sudo pacman -S bluez-utils
9. sudo pacman -S bluez
10. sudo pacman -S blueman
    - the above three are for bluetooth
11. yay -S wlsunset
    - for night light
12. sudo pacman -S python-pip
13. sudo yay -S ttf-ubuntu-nerd
    - installed fonts and icons
14. sudo pacman -S swaybg
    - for background image
15. pip3 install python-dateutil
16. pip3 install geocoder
17. pip3 install geopy
    - the above three for weather widget

18. spicetify-cli
19. yay -S spicetify-themes-git
    - for spotify theme
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
20. sudo pacman -S bc
    - needed for the spotify bar widget to work

    - enable spotifyd service
        ```
        $ systemctl --user enable spotifyd.service
        ```
23. yay -S icat   (for viewing imagies in terminal)
24. yay -S catppuccin-gtk-theme-mocha catppuccin-gtk-theme-macchiato catppuccin-gtk-theme-frappe catppuccin-gtk-theme-latte
    - catpuccin for gtk theme
25. pip install shell-gpt==0.9.0
    - I had to modify my path in order for this to work by adding ~/.local/bin to my path
    - this is for my eww chat gpt widget
26. pacman -Syu sddm qt5-graphicaleffects qt5-svg qt5-quickcontrols2 
27. yay -S sddm-thme-corners-git
    - this is for the sddm theme
    - mkdir /etc/sddm.conf.d
    - cp /usr/lib/sddm/sddm.conf.d/default.conf /etc/sddm.conf.d/
28. pip3 install pybrainyquote
- for the quote widget
29. yay -S swaylock
30. yay l-S swayidle

31. sudo -S grim
32. pacman -S slurp 
    - the above two are for screen shots
    - used with grim to select region for screen shots.
33. pacman -R xdg-desktop-portal-gnome
- remove this package for hyprland
34. pacman -R libva-vdpau-driver
- remove this package for manjaro if I want to run OBS
35. 1. sudo Pacman -S thunar tumbler kitty
    - install thunar
    - changing terminal to kitty
        Went the the edit section => Configure custom Actions => Edit the "open Terminal here" action command from `exo-open --working-directory %f --launch TerminalEmulator` to `kitty --working-directory %f`
    - install extract archive for thunar
        `
        sudo pacman -S thunar-archive-plugin`
    - I also use Nautilus as an alternative file manager
    - tumbler is used a plugin to view picture thumbnails in thunar
36. sudo pacman -S ccid opensc
    - for smart card reader CAC auth
37. sudo pacman -S pkgconf
    - for installing allot of the AUR packages

</details>

# Minecraft play (not listed above)
    1. minecraft-launcher
    2. yay -S minecraft-launcher
    3. pacman -S corectrl
    4. create a script with the following
        ```
        #!/bin/bash
        /usr/lib/polkit-gnome/polkit-gnome-authentication-agent-1 &
        corectrl &
        minecraft-launcher
       ```
        - I use corectrl to control my gpu fan speed
        - I use polkit-gnome-authentication-agent-1 to allow me to use my smart card for authentication for corectrl
    5. cMove the script to a PATH directory and modify the minecraft /usr/share/applications/minecraft-launcher.desktop to use the script
        
# Used this link for git bare repository
https://www.atlassian.com/git/tutorials/dotfiles

# SSH KEY GEN
`ssh-keygen -t rsa`

# Apps using color scheme
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

_____________________________________________________________
# Nvidia (with amd gpu) setup for machine learning
## Below are commands I used to install cuda and cudnn for nvidia gpu while using amd gpu for display
I do not remember what order I did these in and in some cases I not sure if they are needed. I am just listing them here for reference.
```bash
$pacman -S nvidia-dkms nvidia-utils cuda-toolkit 
$pacman -S cuda cudnn
```
I was missing 530.41.03. I have this in my notes but do not remember what this references. I think it was a driver version.
```bash
I was missing linux headers so I installed them with
```
```bash
$pacman -S linux-headers
```
**_NOTE:_** I installd the linux-headers associated with 63. However typically you would install the header versions associated with the kernel version you are running. 
You can check the kernel version with
```bash 
$uname -r
```
Since I was using an amd gpu for display I had to remove the `61-gdm-rules` file for GDM. I was having issues where it wasn't showing all of my wayland desktop environments.

You can use the following to make sure cuda drivers have been set up correctly:
```bash
/opt/cuda/extras/demo_suite/deviceQuery
```
It should list your nvidia gpu and some CUDA information.

# Monitor issue
There is some issue where the monitors will switch inregaruds to eww. when this happens I just change the numbers eww#.yuck file to the right number. you should see what I am talking about when you open the file. For example main_1 and the corresponding variable may sway to main_2 and main_2 to main_1


# on Fedora
________________________________________________________________________________________________________________________

```
$ sudo dnf install akmod-nvidia
$ sudo dnf install xorg-x11-drv-nvidia-cuda
```

# On Fedora dotfile setup
```
$ sudo dnf install wlsunset
```

### Setting Fonts

Download fonts from https://github.com/ryanoasis/nerd-fonts#patched-fonts
then extract the folder, move or cp foler to /usr/share/fonts
then fc-cache -f -v

## setting up stable diffusion

### for controlnet extension
- download the contol_sd15_canny.pth,depth.pth,openpose.pth,and scribble.pth form hugging face.
- install the extension by going to https://github.com/Mikubill/sd-webui-controlnet copy the url (the one listed), paste into Extensions-> install from url -> URL for extnsion git repository.
    - the actual controlNet repo (dont use with webui) https://github.com/lllyasviel/ControlNet
- then after hitting install go to Extensions->Installed->hit aply and restart UI.

- then mv the .pth file to ..stable-diffusion-webui/extensions/sd-webui-controlnet/models

## adding tail scale

- add tailscale repository and install tailscale
```
sudo dnf config-manager --add-repo https://pkgs.tailscale.com/stable/fedora/tailscale.repo
sudo dnf install tailscale
```

- use systemctl to enable and start the service 
```
sudo systemctl enable --now tailscaled
```

- Connect your machine to your Tailscale network and authenticate in your browser
```
sudo tailscale up
```

fin your tailscale IPv4 address by running
```
tailscale ip -4
```

## Creating a conda env corerctly

You need to make sure you specify the python version or it wont really crate the env when you ttry to run "conda activate xyz".
```
conda create -n name_of_env python=3.11
```