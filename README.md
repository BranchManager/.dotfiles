# This README is a work in progress 
# preview of my desktop
![desktop](https://github.com/BranchManager/.dotfiles/blob/main/Pictures/desktop_showcase.png)

# For Manjaro The below needs to be updated for fedora

_____________________________________________________________
## Color Theme
**_NOTE:_** Things may need to be done according to  what distor you have. I also started with a wayland gnome environent and then switched to hyprland so some things may be different.

Catpuccin

## Apps using color scheme
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

<details>
<summary> Details on what I installed </summary>



</details>

## Minecraft play (needs to be updated for fedora)
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
        
## Used this link for git bare repository
https://www.atlassian.com/git/tutorials/dotfiles

## SSH KEY GEN
`ssh-keygen -t rsa`



_____________________________________________________________


## Nvidia (with amd gpu) setup for machine learning (on arch)
### Below are commands I used to install cuda and cudnn for nvidia gpu while using amd gpu for display
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


# On Fedora
________________________________________________________________________________________________________________________

### make a folder where git repositories are stored
```bash
$ mkdir utils
```
## what I installed for cuda (this is for blender too)
```bash
$ sudo dnf install akmod-nvidia
$ sudo dnf install xorg-x11-drv-nvidia-cuda
```
(below is mainly for blender)
then wait a minute or two until modinfo -F version nvidia gives a non-error output (which I didn't have)

Then, reboot so that Nvidia drivers will take effect over Nouveau. Then, (From RPM cuda fusion howto page):
```bash
sudo dnf config-manager --add-repo https://developer.download.nvidia.com/compute/cuda/repos/fedora35/x86_64/cuda-fedora35.repo
sudo dnf clean all
sudo dnf module disable nvidia-driver
sudo dnf -y install cuda
```
The 35 in first line is intentional. Also, the module disable line does not disable your existing akmod nvidia driver that you just installed, but rather prevents the next line from installing Nvidia's dkms driver over your existing driver.

After this, /usr/local/cuda/bin/nvcc will be available, but if you try to run it on a .cu file, it will complain that "gcc 12 is not supported".

to get it working on blender what I did was run blender with the following:
```bash
CYCLES_CUDA_EXTRA_CFLAGS="-ccbin gcc -allow-unsupported-compiler" blender
```
alternatively you may be able to set this in your bash_profile or you can set the the hyprland conf file (*neither worked for me) so I made a wrapper script and edited the blender.desktop file to use the wrapper script in my .local/bins

sources for about: https://unix.stackexchange.com/questions/716248/how-do-i-use-cuda-toolkit-nvcc-11-7-1-on-fedora-36, https://docs.blender.org/manual/en/latest/render/cycles/gpu_rendering.html

### for blender to use rocm-hip this sis assuming you have the rpm package and not the flatpack package
```bash
sudo dnf install rocm-hop
```
For some reason this will break on hyprland when you try to open blender settings but on gnome you may habe better luck



## Install Starship 
```bash
curl -sS https://starship.rs/install.sh | sh
```

## Installed packages and dependencies on Fedora and rust
```bash
sudo dnf -y install tailscale dmenu pavucontrol libnotify rofi bluez blueman sddm waybar slurp opensc pkgconf swaylock wlsunset swaylock install gtk3-install gtk-layer-shell-devel file-devel pango-devel gdk-pixbuf2-devel cairo-devel libgcc gcc glibc-devel pkgconf opensc libwebp-devel gcc-c++ wayland-protocols-devel cmake ninja-build && curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

pip install geopy
pip install pybrainyquote
pip install geocoder
```
## for the weather widget
for the weather widget to work put your key in
~/.config/.openewather_key

## Installing sgpt
Needed for eww gpt widget
```bash
wget https://github.com/tbckr/sgpt/releases/download/v2.10.0/sgpt-2.10.0-1.x86_64.rpm
sudo dnf install sgpt-2.10.0-1.x86_64
```
create folder called .openai_key in .config folder and put your open ai key in there

## Installing swaync
```bash
dnf copr enable erikreider/SwayNotificationCenter
dnf install SwayNotificationCenter
```

## Installing spotify
To install Spotify using Snap:

Install Snap using DNF:
```bash
sudo dnf install snapd
```
Either log out and back in again, or restart your system, to ensure snap’s paths are updated correctly.

To enable classic snap support, enter the following to create a symbolic link between /var/lib/snapd/snap and /snap:

```bash
sudo ln -s /var/lib/snapd/snap /snap
```
Install spotify, simply use the following command:

```bash
snap install spotify
```
Click on the Spotify icon in the applications list.

## Installing Hyprpaper
```bash
#the below dependencies should be installed using the above installs
sudo dnf install wayland-devel wayland-protocols-devel pango-devel cairo-devel file-devel libglvnd-devel libglvnd-core-devel libjpeg-turbo-devel libwebp-devel gcc-c++
git clone git@github.com:hyprwm/hyprpaper.git
sudo mv ./build/hyprpaper /usr/bin/

```


## Installing Rofi wifi menu
```bash
cd utls
git clone git@github.com:ericmurphyxyz/rofi-wifi-menu.git
```

## Installing Eww on Fedora
```bash
sudo dnf -y install gtk3-install gtk-layer-shell-devel pango-devel gdk-pixbuf2-devel cairo-devel libgcc glibc-devel

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
#youll need to restart terminal here 
git clone https://github.com/elkowar/eww
cd eww
cargo build --release --no-default-features --features=wayland
cd target/release
chmod +x ./eww
```



```bash
sudo pacman -S bluez-utils??? python-pip swaybg  qt5-svg qt5-quickcontrols2 thunar thunar-archive-plugin ccid opensc pkgconf
```

## open tablet driver
```
wget https://github.com/OpenTabletDriver/OpenTabletDriver/releases/latest/download/OpenTabletDriver.rpm
sudo dnf indtall ./OpentabletDriver.rpm
```
to enable daemon for opentablet driver (if on wm gnome seems to have it automatically activated)
```
systemctl --user start opentabletdriver.service 
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


## Setting up stable diffusion

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
### How to set up discord
1. Download the tar file from discords home page for linux
2. extract and move folder to the /opt dir or use the below command which will extract it to the opt folder
```bash
sudo tar -xvzf discord-0.0.27.tar.gz -C /opt
```
3. Then create a symboic link
```bash
sudo ln -sf /opt/Discord/Discord /usr/bin/Discord
```
4. move or copy the .desktop file from the /opt/discord/discord.desktop to the /usr/share/applications/ dir and have the file look like:
```
[Desktop Entry]
Name=Discord
StartupWMClass=discord
Comment=All-in-one voice and text chat for gamers that's free, secure, and works on both your desktop and phone.
GenericName=Internet Messenger
Exec=/usr/bin/Discord <-----
Icon=/opt/Discord/discord.png <-----
Type=Application
Categories=Network;InstantMessaging;
Path=/usr/bin
```

So now when you have to update discord you just repeat steps one and extract using 2
## Setting up Conda

### Deactivating the conda base env
```bash
conda config --set auto_activate_base false
```
### Creating a conda env corerctly

You need to make sure you specify the python version or it wont really crate the env when you ttry to run "conda activate xyz".
```
conda create -n name_of_env python=3.11
```