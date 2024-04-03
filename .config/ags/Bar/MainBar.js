import {weather, get_weather} from '../weather.js'
import { get_quote_of_the_day,quote_of_the_day } from '../quote_of_the_day.js';
import { main_widget } from '../Bar/MainWidget.js';
import { create_workspace_indicator } from './Workspaces.js';
import { sysTray } from './Tray.js';

App.applyCss(`${App.configDir}/Bar/bar.css`)
// import { media } from './media.js';
// import { CenterSection } from './Bar/Workspaces.js'

//import  NotificationPopups  from "./notificationPopups.js"
// import NotificationPopups from "./Notifications/aylurspopups__redo.js"
// import {Notification_button, notification_revealer} from "./Notifications/Notification_Center.js"

const GLib = imports.gi.GLib;
let currentDirectory = GLib.get_current_dir();
console.log("this is the current directory");
console.log(currentDirectory);
var btr = true;

const myVariable = Variable(0)
// App.addIcons(`${App.configDir}/assets`)
// App.addIcons(`${App.configDir}/assets/weather_icons`)
// App.applyCss(`${App.configDir}/logo.scss`)
//const network = await Service.import('network')
console.log(`${App.configDir}`)





const main_icon_and_workspaces = (monitor = 0) => Widget.Box({
    vertical: false,
    spacing: 5,
    children: [fedora_button(), create_workspace_indicator(monitor)]

})

const new_date = () => Widget.Label({className:'BarDate'}).poll(1000, label => label.label = Utils.exec('date -d now +"%A %b %d %Y %l:%M%p %Z"'))


export function create_my_bar(monitor = 0){
    const main_box = Widget.CenterBox({
        className: 'main-box',
        
        startWidget: main_icon_and_workspaces(monitor),//create_workspace_indicator(monitor),
        centerWidget: new_date(), //Widget.Label({ label: count.toString()}),
        endWidget: sysTray(),//fedora_button(),
        //endWidget: NetworkIndicator(),
        

    })
    return Widget.Window({
        monitor,
        name: 'ggg' + monitor.toString(), // this name has to be unique
        anchor: ['top', 'left', 'right'],
        className: 'my_bar',
        layer: 'overlay',
        exclusivity: 'exclusive',
        child: main_box,
         //Widget.Label({ label: date.bind() })
    })

 
}




function fedora_button(){
    return Widget.Button({
        child: fedora_icon(),
        hexpand: false,
        //css: 'background-color: grey;',
        onPrimaryClick:  () => {
            console.log('Button clicked');
            if (main_widget.revealChild) {
                main_widget.revealChild = false;
                console.log('revealChild set to false');
                console.log(main_widget.revealChild)
            } else {
                main_widget.revealChild = true; //This will reveal the main_widget
                get_weather();
                get_quote_of_the_day()
                console.log('revealChild set to true');
                console.log(main_widget.revealChild)
            }
        
        }
    })
}

function fedora_icon(){
        return Widget.Icon({
        hexpand: true,
        hpack: 'start',
        name: 'fedora',
        visible: true,
        className: 'fedora_icon',
        icon: 'fedora-symbolic',
        //css: 'color: green;',
    })
}

