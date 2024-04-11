
App.addIcons(`${App.configDir}/assets`)
import Gdk from "gi://Gdk"
import { main_widget } from './Bar/MainWidget.js';
import { create_my_bar } from './Bar/MainBar.js';
import NotificationPopups from "./Notifications/aylurspopups__redo.js"
import { power_widget } from './power_menu.js';
import { applauncher_box } from './applauncher.js';
import { GPT_box } from './sGPT.js';
import { Volume_Shortcut_Indicator } from './VolumeShortcut.js';
//import {quote_of_the_day_fullview} from './quote_of_the_day.js';
import { get_main_monitor } from "./Select_main_monitor.js";
import { quote_of_the_day_fullview } from "./quote_of_the_day.js";

const GLib = imports.gi.GLib;


function widget_box(monitor = 0){
//const widget_box = (monitor = 2) => 

    print("monitor #####################################: " + monitor)    
    return Widget.Window({
    monitor,
    anchor: ['top','right' ],
    name: "monitor" + monitor.toString(),
    layer: 'overlay',
    keymode: 'on-demand',

    //The main invisible box
    child: Widget.Box({
        //spacing: 100,
        homogeneous: false,
        vertical: false,
        vpack: "end",
        hpack: "start",
        //main box that contains the revealed box we need the padding to be thin so i twont interfere with the main windows
        css: `background-color: rgba(0,0,0,0); padding: 0.1px;`,
      
        //chang the below to a function and change the variable to a functin to have it appear on multiple monitors
        child: main_widget,

    })  //Widget.Label({ label: date.bind() })
})}
function make_tinted_background(monitor = 0){
    return Widget.Window({
        monitor,
        visible: false,
        name: "tinted_background" ,
        keymode: 'on-demand',
        layer: 'top',
        child: Widget.Box({
            className: 'tinted_background',
        
        
        hpack: 'center',
        vpack: 'center',

        }),

        setup: self => self.keybind("Escape", () => {
            print("REVEALER")
            App.closeWindow("tinted_background")
            App.closeWindow("quote_of_the_day")
            power_widget.revealChild = false;

            
        }),
    })
}
function power_box(monitor = 0){
    return Widget.Window({
        monitor,
        anchor: ['top'],
        name: "power" + monitor.toString(),
        layer: 'overlay',

        child: Widget.Box({
            vpack: "end",
            hpack: "start",
            css: 'background-color: rgba(0,0,0,0); padding: 0.1px;',
            child: power_widget,

        })

    })
}




Utils.timeout(100, () => Utils.notify({
    appName: "Branch Managers",
    summary: "Branch Managers Dots",
    iconName: "info-symbolic",
    body: "Lorem ipsum dolor sit amet, qui minim labore adipisicing "
        + "minim sint cillum sint consectetur cupidatat.",
    actions: {
        "Cool": () => print("pressed Cool"),
    },
}))
export function forMonitors(widget) {
    const n = Gdk.Display.get_default()?.get_n_monitors() || 1
    return range(n, 0).map(widget).flat(1)
   
    
}

/**
 * @returns [start...length]
 */
export function range(length, start = 1) {
    return Array.from({ length }, (_, i) => i + start)
}


App.config({ windows: ()=>[...forMonitors(create_my_bar)]})
//App.config({ windows: ()=>[...forMonitors(Volume_Shortcut_Indicator)]})

let monitor = get_main_monitor()
print("MAIN MONITOR: 88888888888888888888888888888888888888888" + monitor)

App.config({ windows:[GPT_box(monitor)]})
App.config({windows: [applauncher_box(monitor)],})
App.config({windows: [Volume_Shortcut_Indicator(monitor)]})
App.config({windows: [quote_of_the_day_fullview(monitor)]})
App.config({windows: [make_tinted_background(monitor)]})
App.config({windows: [power_box(monitor)]})
App.config({windows: [widget_box(monitor)]})


// App.config({
//     //style: App.configDir + "/style.css",
//     windows: [
//         NotificationPopups(2),
//     ],
// })
// App.config({windows: [widget_box(2)]})
