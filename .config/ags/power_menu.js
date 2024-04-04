App.addIcons(`${App.configDir}/assets`)

const lock  = () => Widget.Button({
    className: 'quick_setting_power_button',
    child: Widget.Icon({
        size: 30,
        icon: 'sky-lock',
    }),
    onClicked: () => { 
        yes_no_revealer.revealChild = true; 
        yes_no_revealer.child.children[1].children[0].child.label = 'Lock?';
        //yes button for lock
         yes_no_revealer.child.children[1].children[0].onClicked = () => {power_widget.revealChild = false; Utils.exec('hyprlock')} 
        //no button for lock
        yes_no_revealer.child.children[1].children[1].onClicked = () => { power_widget.revealChild = false;}
       
   }
})

const logout  = () => Widget.Button({
    className: 'quick_setting_power_button',
    child: Widget.Icon({
        size: 30,
        icon: 'exit-flamingo',
    }),
    onClicked: () => { 
        yes_no_revealer.revealChild = true; 
        yes_no_revealer.child.children[1].children[0].child.label = 'Logout?';
        //yes button for logout
        yes_no_revealer.child.children[1].children[0].onClicked = () => {Utils.exec('hyprctl dispatch exit')}
        //no button for logout
        yes_no_revealer.child.children[1].children[1].onClicked = () => { power_widget.revealChild = false; }
       
   }
})

const restart  = () => Widget.Button({
    className: 'quick_setting_power_button',
    child: Widget.Icon({
        size: 30,
        icon: 'restart-lavendar',
    }),
    onClicked: () => { 
        yes_no_revealer.revealChild = true; 
        yes_no_revealer.child.children[1].children[0].child.label= 'restart?';
         yes_no_revealer.child.children[1].children[0].onClicked = () => {Utils.exec('systemctl restart')}
        yes_no_revealer.child.children[1].children[1].onClicked = () => { power_widget.revealChild = false;}
       
   }
})

const sleep  = () => Widget.Button({
    className: 'quick_setting_power_button',
    child: Widget.Icon({
        size: 30,
        icon: 'sleep-Frappe-green',
    }),
    onClicked: () => { 
        yes_no_revealer.revealChild = true; 
        yes_no_revealer.child.children[1].children[0].child.label = 'Sleep?';
         yes_no_revealer.child.children[1].children[0].onClicked = () => {Utils.exec('systemctl suspend')}
        yes_no_revealer.child.children[1].children[1].onClicked = () => { power_widget.revealChild = false;}
       
   }
})
const power_button = () => Widget.Button({
    className: 'quick_setting_power_button',
    child: Widget.Icon({
        size: 30,
        icon: 'power-red',
    }),
    onClicked: () => { 
         yes_no_revealer.revealChild = true; 
         yes_no_revealer.child.children[1].children[0].child.label = 'Power Off?';
         yes_no_revealer.child.children[1].children[0].onClicked = () => {Utils.exec('systemctl poweroff')}
        yes_no_revealer.child.children[1].children[1].onClicked = () => { power_widget.revealChild = false;}
        
    }
})

const yes_no_revealer = Widget.Revealer({ //yes_no_revealer.child.children[1].children[0].child.label
    revealChild: false,
    transition: 'slide_down',
    child: Widget.Box({
        vertical: true,
        spacing: 0,
        children: [
            Widget.Box({
                vertical: false,
                hexpand: true,
                children: [
                    
                    Widget.Label({
                        hpack: 'end',
                        hexpand: true,
                        className: "power_prompt"}), //this gets set dynamically depending on the button clicked
                ]
            }),

            Widget.Box({
                
                vertical: false,
                hexpand: true,
                children: [Widget.Button({
                    hexpand: true,
                        className: 'quick_setting_power_button_yn',
                        child: Widget.Label({
                            
                            className: 'quick_setting_power_button_yn',
                        }),
                    }),
                    Widget.Button({
                        hexpand: true,
                        className: 'quick_setting_power_button_yn',
                        child: Widget.Label({
                            label: 'No',
                            className: 'quick_setting_power_button_yn',
                        }),
                    }),
                ]
            })
        ]
    })
})

export function get_uptime(){
    uptime.label = Utils.exec("uptime -p")
    
}

const uptime = Widget.Label({
    hexpand: true,
    hpack: 'center',
    css: ' margin-left: 10px; margin-right: 3px;',
    //label:Utils.exec("uptime -p")
})
const power_buttons = Widget.Box({
   //className: 'quick_setting_power_button',
   vertical: false,
    //spacing: 5,
    children: [
        power_button(),
        sleep(),
        restart(),
        logout(),
        lock(),
        // restart_button(),
        // logout_button(),
        // suspend_button(),
        // lock_button(),
    ]
})

export const power_widget  = Widget.Revealer({
    revealChild: false,
    transition: 'slide_down',
    child:Widget.Box({
        className: 'main_background',
        vertical: true,
        spacing: 0,
        children: [power_buttons, uptime, yes_no_revealer]
    })
})