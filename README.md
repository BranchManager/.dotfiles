
# This README is a work in progress

# preview of my desktop

![desktop](https://github.com/BranchManager/.dotfiles/blob/main/Pictures/desktop_showcase.png)
_____________________________________________________________

## Color Theme is Catppuccin

**_NOTE:_** Things may need to be done according to what distor you have. I also started with a wayland gnome environent and then switched to hyprland so some things may be different.

# Installs For Fedora

________________________________________________________________________________________________________________________
## Install Starship

```bash

curl -sS https://starship.rs/install.sh | sh

```

## Installed packages and dependencies on Fedora and rust

```bash

sudo dnf -y install hyprland hypridle hyprlock hyprpaper tailscale dmenu pavucontrol libnotify rofi bluez blueman sddm waybar slurp opensc pkgconf wlsunset install gtk3-install gtk-layer-shell-devel file-devel pango-devel gdk-pixbuf2-devel cairo-devel libgcc gcc glibc-devel pkgconf opensc amdgpu_top python3-devel libwebp-devel gcc-c++ wayland-protocols-devel cmake ninja-build && curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

  
  

pip install --upgrade --quiet langchain langchain-openai context-python geopy geocoder langchain-chroma langchain unstructured networkx pandas openpyxl

  

```


## Setting Fonts

Download fonts from https://www.nerdfonts.com/font-downloads

Then extract folder. Then move folder to /usr/share/fonts then run fc-cache -f -v

  

```

$ wget https://github.com/ryanoasis/nerd-fonts/releases/download/v3.1.1/Iosevka.zip

$ sudo unzip Iosevka.zip

$ sudo mv -r Iosevka /usr/share/fonts/Iosevka

$ sudo fc-cache -f -v
```

## for the weather widget

for the weather widget to work put your key in

~/.config/.keys