// This is the main configuration file for the Hyprland Desktop Environment
// It is responsible for setting up the main windows and widgets for the desktop
App.addIcons(`${App.configDir}/assets`)
import Gdk from "gi://Gdk"
import { main_widget } from './Bar/MainWidget.js';
import { create_my_bar } from './Bar/MainBar.js';
import { power_widget } from './power_menu.js';
import { applauncher_box } from './applauncher.js';
import { GPT_box } from './sGPT.js';
import { Volume_Shortcut_Indicator } from './VolumeShortcut.js';
import { get_main_monitor } from "./Select_main_monitor.js";
import { quote_of_the_day_fullview } from "./quote_of_the_day.js";


//This is the main window for the Widget Box
function widget_box(monitor = 0){

    
    return Widget.Window({
    monitor,
    anchor: ['top','right' ],
    name: "monitor" + monitor.toString(),
    layer: 'overlay',
    keymode: 'on-demand',

    //The main invisible box
    child: Widget.Box({
        
        homogeneous: false,
        vertical: false,
        vpack: "end",
        hpack: "start",
        css: `background-color: rgba(0,0,0,0); padding: 0.1px;`,
      
        child: main_widget,

    }) 
})}

// This handles tinting the background when the power menu is open and the quote of the day
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
           
            App.closeWindow("tinted_background")
            App.closeWindow("quote_of_the_day")
            power_widget.revealChild = false;

            
        }),
    })
}

// This handles the power menu window
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

//this function is used to create the bars and app launcher for each monitor
//This would work for the widgets and ai too but was having issues seemingly withthe binded data
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
App.config({ windows: ()=>[...forMonitors(applauncher_box)]})

//this will get the main monitor as defined in the hyprland config
let monitor = get_main_monitor()

//Put the correct windows on the main monitor
App.config({ windows:[GPT_box(monitor)]})
App.config({windows: [widget_box(monitor)]})
App.config({windows: [Volume_Shortcut_Indicator(monitor)]})
App.config({windows: [quote_of_the_day_fullview(monitor)]})
App.config({windows: [make_tinted_background(monitor)]})
App.config({windows: [power_box(monitor)]})

