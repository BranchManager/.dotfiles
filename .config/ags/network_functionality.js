/*
* This file is responsible for the network functionality of the widget
*/
import { bluetooth_reveal_func } from "./bluetooth_functionality.js";
const network = await Service.import('network')
const bluetooth = await Service.import('bluetooth')
const netwot = Variable([Widget.Label({label: 'no devices detected'})])
const GLib = imports.gi.GLib;

var network_quicksettings_reveal = false;
var device_list;

// This function will reveal or close the wifi section depending wheere it is called from
//For example if bluetooth calls this function then it will close the wifi section
export function network_reveal_func(is_other_app_calling_me){

    if (is_other_app_calling_me){
        network_revealer.revealChild = false;
      
        
    //if the network is calling this function then reveal the section
    //and get a list of access points
    }else if (!is_other_app_calling_me){
        // close other drop down menus if network is activating its drop down menu
        bluetooth_reveal_func(true);

        get_access_points()
        network_quicksettings_reveal = false;
        console.log('reveal_func');
        if (network_revealer.revealChild) {
            network_revealer.revealChild = false;

        } else {
            network_revealer.revealChild = true;

        }
    }
}

const WiredIndicator = () => Widget.Icon({
    icon: network.wired.bind('icon_name'),
})

const WifiIndicator = () => Widget.Button({
    className: 'wifi_quick_setting_button_box',
    onClicked: () => network_reveal_func(false),
    child: Widget.Icon({
        size: 50,
        icon: network.wifi.bind('icon_name'),
        }),

    
})
const header = Widget.Label({ xalign: 0, className: 'bluetooth_device_header', label: 'Access Points',})
const box_header = Widget.Box({
    vertical: false,
    
    className: 'bluetooth_device_header',
    child: header,
})



function make_device_box(button_class, button_label, ssid, connection,sec){
    
    function return_placeholder_text(){
        if(sec == 'WPA2' || sec == 'WPA3' || sec == 'WPA' || sec == 'WEP'){
            return 'Enter Wifi Password'
        }else{
            return 'No password needed, hit Enter to connect'
        }
    }

    function connect_to_wifi_device(widget,ssid, password, sec){
        if(sec == 'WPA2' || sec == 'WPA3' || sec == 'WPA' || sec == 'WEP'){
            print('nmcli dev wifi connect ' + ssid + ' password \"' + password + '\"')
            password_revealer.child.text = 'Connecting...'
            print('nmcli dev wifi connect ' + ssid + ' password ' + password )
            Utils.execAsync('nmcli dev wifi connect ' + ssid + ' password ' + password )
                .then(val => {password_revealer.child.text = "Connected!"; print(val + password)})
                .catch(val =>{password_revealer.child.text = val; print(val)})    
  
        }else{
            //TODO: Test this probably never going to be used
            
            password_revealer.child.text = 'Connecting...'
            print('nmcli dev wifi connect ' + ssid)
        }
    }
    const password_revealer = Widget.Revealer({revealChild: false, 
        child:
        Widget.Entry({
            className: 'wifi_password_entry_box',
            placeholder_text: return_placeholder_text(),
  
            visibility: true,

            onAccept: ({text,placeholder_text}) => connect_to_wifi_device(placeholder_text,ssid,text,sec)
         
        })

    })
    return Widget.Box({ vertical: true, children: [
        Widget.Box({ vertical: false, children: [
            Widget.Label({css: 'padding-right: 5px; color: #cad3f5', label: connection}),
            Widget.Button({
                className: 'device_box',
                child: Widget.Label( {className: button_class, label: button_label}),
                
                onClicked: () => {
                    if (button_label == 'Connect'){
                        print("This is the connected status: ")
                        print(connection)
                        password_revealer.revealChild = true
                    }else{
                        print(connection)
                        print("disconnecting chump")
                        Utils.execAsync('nmcli con down ' + ssid)
                        .then(val => {print(val)})
                        .catch(val =>{print(val)})
                    }//print('disconnecting'),
                }
            }),
            Widget.Label({css: 'padding-right: 5px; color: #cad3f5', xalign: 200, label: ssid}),
            
            Widget.Label({css: 'padding-right: 5px; color: #cad3f5', label: sec}),
            
        ]}),
        password_revealer,
    ]})
    
}


function get_access_points(){


    console.log("ACCESS PPOINTS")

  
    var wifi_icon = ''
    var device_array = []
    //get the list of wifi devices
    device_list = Utils.exec('nmcli dev wifi list')
    var device_list_lines = device_list.split('\n')
    netwot.value = [Widget.Label({css: 'color: black', label: 'loading...'})]

    for (var i = 0; i < device_list_lines.length; i++){
        if (i != 0 ){
            var device_info = device_list_lines[i].split(/\s+/)
            if (device_info[2] != '--'){
                if (parseInt(device_info[7]) < 25)
                    wifi_icon = '󰤟'
                else if (parseInt(device_info[7]) < 50)
                    wifi_icon = '󰤢'
                else if (parseInt(device_info[7]) < 75)
                    wifi_icon = '󰤥'
                else
                    wifi_icon = '󰤨'

                    //For each device make a box with the all the device info and functionallity
                if (device_info[0] == '*'){
                    var connected_device = make_device_box('wifi_connected','Disconnect',device_info[2],wifi_icon,device_info[9])
                }else{
                    

                    var connected_device = make_device_box('wifi_not_connected','Connect',device_info[2],wifi_icon,device_info[9])
                    print(Widget.Label({css: 'color: black', label: device_info[0]}))
                }

                device_array.push(connected_device)
 
            }


        }
    }
    //for some reason I have to use a timeout to get the value to update so we wait 100ms
    GLib.timeout_add(GLib.PRIORITY_DEFAULT, 100, () => {
        
        netwot.value = device_array

    });
  

}


const wifi_access_points = Widget.Box({
    vertical: true,
    hpack: 'endy',
    hexpand: true,
    vpack: 'center',
    className: 'accesspoints_forground_box',
    children: netwot.bind()


})

// This export is the revealer under the quick settings widget
export var network_revealer = Widget.Revealer({
    revealChild: false, 
    child: Widget.Box({

        vertical: true,
        children: [Widget.Box({
           
            hpack: 'end',
             vertical: false,
             child: Widget.Switch({
                 active: false, 
                 className: 'bluetooth_toggle_slider',
                onActivate: () =>{network.toggleWifi()},
             })
 
         }),
         Widget.Box({
            vertical: true,
           child: box_header,

        }),
        Widget.Box({
            //hpack: 'center',
            vertical: false,
            vpack: 'center',
            hexpand: false,
            className: 'accesspoints_background_box',
            child: wifi_access_points
        })]
    }),

})
// This is the main export determining whether we are using wired or wifi
export const NetworkIndicator = () => Widget.Stack({
  
    name: 'network',
    children: { 
        'wired': WiredIndicator(),
        'wifi': WifiIndicator(),
    },
    shown: network.bind('primary').as(p => p || 'wifi'),
})
