# The Branch Manager Dots

**_NOTE:_** These are my current Dotfiles on Fedora. They will be kept up to date so long as I am using Hyprland and the tools in use stay updated.  I will probably even add some features and tweaks in the future. Feel free to make PRs and and issues and I may get to them. However this will not be my focus. These dots can be a bit buggy but should mostly function as intended and nothing that makes them unusable. Bugs and things will be fixed slowly as time goes on but my main focus will be on other projects namely game development.  If you have any questions feel free to ask me. There are some things I may have overlooked putting in the readme

# preview of my desktop

![](https://github.com/BranchManager/.dotfiles/blob/main/Pictures/desktop_showcase.png)
![](https://raw.githubusercontent.com/BranchManager/.dotfiles/Fedora/Pictures/showcase6.png)

![](https://raw.githubusercontent.com/BranchManager/.dotfiles/Fedora/Pictures/showcase5.png)

![](https://raw.githubusercontent.com/BranchManager/.dotfiles/Fedora/Pictures/showcase2.png)

![](https://raw.githubusercontent.com/BranchManager/.dotfiles/Fedora/Pictures/showcase3.png)

![](https://raw.githubusercontent.com/BranchManager/.dotfiles/Fedora/Pictures/showcase4.png)
_____________________________________________________________

## Color Theme is Catppuccin
https://github.com/catppuccin/catppuccin

#  Fedora Setup

________________________________________________________________________________________________________________________
## Install Starship

```bash

curl -sS https://starship.rs/install.sh | sh

```

## Dependencies 
```bash

sudo dnf -y install hyprland hypridle neofetch hyprlock hyprpaper tailscale dmenu pavucontrol btop libnotify rofi bluez blueman sddm waybar slurp opensc pkgconf wlsunset install gtk3-install gtk-layer-shell-devel file-devel pango-devel gdk-pixbuf2-devel cairo-devel libgcc gcc glibc-devel pkgconf opensc amdgpu_top python3-devel libwebp-devel gcc-c++ wayland-protocols-devel cmake ninja-build && curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

  
  

pip install --upgrade --quiet langchain langchain-openai context-python geopy geocoder langchain-chroma langchain unstructured networkx pandas openpyxl

  

```

### The main thing to know is this uses AGS and Hyprland

## Setting Fonts

Download fonts from https://www.nerdfonts.com/font-downloads

Then extract folder. Then move folder to /usr/share/fonts then run fc-cache -f -v

  

```

$ wget https://github.com/ryanoasis/nerd-fonts/releases/download/v3.1.1/Iosevka.zip

$ sudo unzip Iosevka.zip

$ sudo mv -r Iosevka /usr/share/fonts/Iosevka

$ sudo fc-cache -f -v
```


### Setting main monitor
If using multiple monitors add #MAIN_MONITOR next to a monitor line in hyprland.conf to set the  main monitor. This will essentially tell ags what where to place the ai assistant and widget when opening. 
### For Ai assistant
It is using lang chain with data loaded under....[get this ]


I am using an [Openai](https://openai.com/blog/openai-api) api key  which is not Free. You can get your own key on openai's website I linked in the previous sentence.  You will need to set OPENAI_API_KEY env variable with your openai key I have placed mine in ~/.config/.key.conf so you will need to create your own file as the hypr config file imports this file. 

**_NOTE:_** You will need to either remove the source line from the hyprland.conf file or make your own .key.conf or you will get an error. 

If you want to be able to ask information on hyprland you will need to pull the  hyprland wiki github into ```/home/branchmanager/utls/hyprland-wiki``` This is where I look to load the directory for the LLM to reference 


I do have future plans to use openllm so that you wont have to use openai however if you do not have the hardware (an nvidia gpu set up correctly) this may take a bit longetrto query. 


### For the weather widget

for the weather  go to [open weather](https://openweathermap.org/) and create a key.  and set WEATHER_KEY env variable.  This is also set in the same file as the AI assistant

### To set the avatar
I set it using gnome or kde tools. I always have a DE installed. If not you could probably copy image here as well  /var/lib/AccountsService/icons/\<username> 

### BTOP theme
To set the themes check [here](https://github.com/catppuccin/btop?tab=readme-ov-file)