
App.addIcons(`${App.configDir}/assets/weather_icons`)
App.applyCss(`${App.configDir}/logo.scss`)

import { bluetooth_button, bluetooth_revealer} from '../bluetooth_functionality.js'
import {system_monitors, drive_monitor } from '../system_monitor.js'
import { NetworkIndicator,network_revealer } from '../network_functionality.js';
import {bluelightfilter_button} from '../bluelight_filter.js'
import {  Audio_button, main_volume_and_mic_sliders,audio_revealer } from "../audio.js";
import { Calender_and_clock } from '../calendar.js';
import {weather, get_weather} from '../weather.js'
import { get_quote_of_the_day,quote_of_the_day } from '../quote_of_the_day.js';
import { media } from '../media.js';

//import NotificationPopups from "./Notifications/aylurspopups__redo.js"
import {Notification_button, notification_revealer} from "../Notifications/Notification_Center.js"

const Profile_box = () => Widget.Box({
    vertical: true,
    className: 'profile_box',
   
    //className: 'profile_box',
    //css: 'border-radius: 10px; padding: 100px; background-color: red;',
    children: [
        Widget.Box({
            // hpack: 'center',
            // vpack: 'end',
            className: 'profile_image',
            name: "profile_image",
        }),
        Widget.Label({
            vpack: 'center',
            className: 'profile_name',
            label: Utils.exec('whoami'),
        }),

    ]
})

const weather_and_qotd = () => Widget.Box({
    vertical: false,
    spacing: 5,
    children: [weather(),quote_of_the_day()],

})

const profile_and_sysmonitors = () => Widget.Box({
    vertical: false,
    spacing: 5,
    children: [Profile_box(), system_monitors()],
})

const quicksettings_main_box = Widget.Box({
    vertical: true,
    
    className: 'quicksettings_main_box',
    children: [Widget.Box({
        vertical: false,
        hpack: 'center',
        
            children: [bluetooth_button(), NetworkIndicator(), bluelightfilter_button(), Notification_button(), Audio_button()],
        }),
        /*revealer*/ //TODO : remove bluetooth_box it is for testing
        main_volume_and_mic_sliders(),bluetooth_revealer,network_revealer,notification_revealer,audio_revealer,
        
    ],
   //children: [],
})

// function fedora_icon(){
//     return Widget.Icon({
//     hexpand: true,
//     hpack: 'start',
//     name: 'fedora',
//     visible: true,
//     className: 'fedora_icon',
//     icon: 'fedora-symbolic',
//     //css: 'color: green;',
// })
// }

export function bottom_reveal_func(reveal){
    // if (bottom_revealer.revealChild){
    //     bottom_revealer.revealChild = false;
    // }else{
    //     bottom_revealer.revealChild = true;
    // }
    bottom_revealer.revealChild = reveal;
    console.log('bottom_reveal_func')
    console.log(bottom_revealer.revealChild)
    console.log(bottom_revealer.name)
}

export const bottom_revealer = Widget.Revealer({
    name: 'test_revealer',
    revealChild: true,
    transition: 'slide_down',
    child: Widget.Box({
        vertical: true,
        children: [ Calender_and_clock(), weather_and_qotd(),media()]
    })
})

// function fedora_button(){
//     return Widget.Button({
//         child: fedora_icon(),
//         css: 'background-color: grey;',
//         onPrimaryClick:  () => {
//             console.log('Button clicked');
//             if (main_widget.revealChild) {
//                 main_widget.revealChild = false;
//                 console.log('revealChild set to false');
//                 console.log(main_widget.revealChild)
//             } else {
//                 main_widget.revealChild = true;
//                 get_weather();
//                 get_quote_of_the_day()
//                 console.log('revealChild set to true');
//                 console.log(main_widget.revealChild)
//             }
        
//         }
//     })
// }

//cannot be a function cause Ineed reference to the revealer
export const main_widget = Widget.Revealer({
    revealChild: false,
    transition: 'slide_left',
    name: 'revealed_box',
    transitionDuration: 200,
    
    //This box just extends the invisibility of the parent box but enables us to have padding form the top bar and the monitor edge
    child: Widget.Box({
        
        vertical: true,
        className: 'main_background',
        children: [profile_and_sysmonitors(),drive_monitor(),quicksettings_main_box,bottom_revealer],
    })

})

// function create_my_bar(monitor = 0){
//     const main_box = Widget.CenterBox({
        
//         startWidget: fedora_button(),
//         centerWidget: new_date, //Widget.Label({ label: count.toString()}),
//         //endWidget: NetworkIndicator(),
        

//     })
//     let win = Widget.Window({
//         monitor,
//         name: 'ggg', // this name has to be unique
//         anchor: ['top', 'left', 'right'],
//         className: 'my_bar',
//         layer: 'overlay',
//         exclusivity: 'exclusive',
//         child: main_box,
//          //Widget.Label({ label: date.bind() })
//     })

 
// }