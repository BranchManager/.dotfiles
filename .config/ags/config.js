
App.addIcons(`${App.configDir}/assets`)
import { main_widget } from './Bar/MainWidget.js';
import { create_my_bar } from './Bar/MainBar.js';
import NotificationPopups from "./Notifications/aylurspopups__redo.js"
import { power_widget } from './power_menu.js';
import { applauncher_box } from './applauncher.js';
import { GPT_box } from './sGPT.js';

const GLib = imports.gi.GLib;


function widget_box(monitor = 0){
//const widget_box = (monitor = 2) => 
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




// Utils.timeout(100, () => Utils.notify({
//     appName: "Branch Managers",
//     summary: "Branch Managers Dots",
//     iconName: "info-symbolic",
//     body: "Lorem ipsum dolor sit amet, qui minim labore adipisicing "
//         + "minim sint cillum sint consectetur cupidatat.",
//     actions: {
//         "Cool": () => print("pressed Cool"),
//     },
// }))


App.config({windows: [create_my_bar(2)]})
App.config({windows: [create_my_bar(0)]})
App.config({windows: [create_my_bar(1)]})
//App.config({windows: [power_box(2)]})


App.config({windows: [GPT_box(2)],

})

App.config({windows: [applauncher_box(2)],
 
})

//App.config({windows: [widget_box(1)]})
App.config({windows: [widget_box(2)]})
App.config({
    //style: App.configDir + "/style.css",
    windows: [
        NotificationPopups(2),
    ],
})
// App.config({windows: [widget_box(2)]})
