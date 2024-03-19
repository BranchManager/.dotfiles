/*
*This file handle the bluetooth functionality of the Branch Manager Desktop Environment
*/
import {network_reveal_func } from "./network_functionality.js";
const bluetooth = await Service.import('bluetooth')
const bluetooth_icon_on = '/home/branchmanager/.config/ags/assets/lattet-blue-bluetooth.svg'
const bluetooth_icon_off = '/home/branchmanager/.config/ags/assets/frappe-crust-no-bluetooth.svg'

var quicksettings_reveal = false;

// this function check if bluetooth is enabled and returns the status used for the icon and the switch
function check_blue(){
    
    var enables = ''; // The bluetooth logo icon for connected or disconnected
    var enabled = false; //true of false for status of the switch

        if(bluetooth.enabled){

            enables = 'bluetooth'

            enables = bluetooth_icon_on
            enabled = true;
            
        }else{

            enables = 'bluetooth_disabled'
            enables = bluetooth_icon_off
 
        }

    return [enables, enabled]
}

// This is used to reveal the bluetooth devices and the switches
export function bluetooth_reveal_func(is_other_app_calling_mell){

    if (is_other_app_calling_mell){
        bluetooth_revealer.revealChild = false;
        
    } else if (!is_other_app_calling_mell){
        network_reveal_func(true);
        quicksettings_reveal = false;
        console.log('reveal_func');
        if (bluetooth_revealer.revealChild) {
            bluetooth_revealer.revealChild = false;

        } else {
        bluetooth_revealer.revealChild = true;

        }
    }
}

function connect_to_device(device){
    if (device.connected){
        device.setConnection(false)

    }else{
        device.setConnection(true)
    }
}

// The devices label for the list of devices
const header = Widget.Label({ xalign: 0, className: 'bluetooth_device_header', label: 'Devices',})
const box_header = Widget.Box({
    vertical: false,
    
    className: 'bluetooth_device_header',
    child: header,
})

//This will reveal the header defined above and the list of devices
export var bluetooth_revealer = 
    
    Widget.Revealer({
    revealChild: false, 
    child: Widget.Box({

        vertical: true,
        children: [Widget.Box({
           
           hpack: 'end',
            vertical: false,
            child: Widget.Switch({
                active: check_blue()[1],
                className: 'bluetooth_toggle_slider',
                onActivate: () =>{bluetooth.toggle()},
            })

        }),
        Widget.Box({
            vertical: true,
           child: box_header,

        }),
        Widget.Box({
            vertical: true,
         
            className: 'bluetooth_devices_box',

            //This setup will loop through all the devices that have been paired and display them
            setup: self => self.hook(bluetooth, self => {

                //item is the index of the device in the list
                self.children = bluetooth.devices.map(({ icon_name, name,connected },item) => Widget.Box([

                    //The icon ofr one of the devices (To be honest I do not know whwere the icon is coming from) I got this some of 
                    //this setup code from the ags wiki
                    Widget.Icon({classNames:[ 'device_background_'+String(item%2),'device_icon_is_'+(item+1 == 
                        bluetooth.devices.length ? 'bottom': 'top')], icon: icon_name + '-symbolic'}),
                    
                    
                    Widget.Box({
                        tooltipText: 'click to connect',
            
                        vertical: false,
                       hpack: 'end',
                       className: 'device_background_'+String(item%2), //every other device will have a different background color
                       
                        child: Widget.Button({
                            hpack: 'end',
                            className: 'bluetooth_device_connected_'+String(connected),
                            onClicked: () => connect_to_device(bluetooth.devices[item]),
                        })
                    }),
                    //This is just the name of lthe device
                    //Depending on if the device is the last one in the list we will add rounded corners to the bottom
                    Widget.Label({xalign: 0, maxWidthChars: 24 , classNames: ['device_background_'+String(item%2),'device_label_len','device_is_'+(item+1 == 
                        bluetooth.devices.length ? 'bottom': 'top')],label: name}),
                   
               ]))
           })
        }),]
        
    })
        
})

// This is the main bluetooth button that reveal all the devices and the switch
export const bluetooth_button = () => Widget.Button({
    className: 'quick_setting_button_box',
    onClicked: () => bluetooth_reveal_func(false),
    child: Widget.Icon({
        className: 'bluetooth_button_icon_nobt',
       size: 90,

       // This wathces the state of bluetooth and changes the icon accordingly
       //utils.watch will set the icon to the initial value which is the return value of the check_blue function
       icon: Utils.watch(check_blue()[0], bluetooth, () => { 
            if(bluetooth.enabled)
                return bluetooth_icon_on
            if(!bluetooth.enabled)
                return bluetooth_icon_off
            // Not sure of lthis return statement will ever return, maybe if the machine does not have bluetooth
            return bluetooth_icon_off
            })

    })
    
 })


