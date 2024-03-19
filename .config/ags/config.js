
import { bluetooth_button, bluetooth_revealer} from './bluetooth_functionality.js'
import {system_monitors, drive_monitor } from './system_monitor.js'
import { NetworkIndicator,network_revealer } from './network_functionality.js';
const GLib = imports.gi.GLib;
let currentDirectory = GLib.get_current_dir();
console.log("this is the current directory");
console.log(currentDirectory);
var btr = true;

const myVariable = Variable(0)
App.addIcons(`${App.configDir}/assets`)
App.applyCss(`${App.configDir}/logo.scss`)
//const network = await Service.import('network')
console.log(`${App.configDir}`)







const new_date = Widget.Label().poll(1000, label => label.label = Utils.exec('date -d now +"%A %b %d %Y %l:%M%p %Z"'))


function create_my_bar(monitor = 0){
    const main_box = Widget.CenterBox({
        
        startWidget: fedora_button(),
        centerWidget: new_date, //Widget.Label({ label: count.toString()}),
        //endWidget: NetworkIndicator(),
        

    })
    let win = Widget.Window({
        monitor,
        name: 'ggg', // this name has to be unique
        anchor: ['top', 'left', 'right'],
        className: 'my_bar',
        layer: 'overlay',
        exclusivity: 'exclusive',
        child: main_box,
         //Widget.Label({ label: date.bind() })
    })

 
}
function set_reveal(){
    btr = false;
}


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
const quicksettings_main_box = Widget.Box({
    vertical: true,
    className: 'quicksettings_main_box',
    children: [Widget.Box({
        vertical: false,
        
            children: [bluetooth_button(), NetworkIndicator()],
        }),
        /*revealer*/ //TODO : remove bluetooth_box it is for testing
        bluetooth_revealer,network_revealer,
        
    ],
   //children: [],
})

const profile_and_sysmonitors = () => Widget.Box({
    vertical: false,
    spacing: 5,
    children: [Profile_box(), system_monitors()],
})
// Reveeals the entire box
const widget_revelead_box = Widget.Revealer({
    revealChild: true,
    transition: 'slide_right',
    name: 'revealed_box',
    transitionDuration: 300,
    //This box just extends the invisibility of the parent box but enables us to have padding form the top bar and the monitor edge
    child: Widget.Box({
        vertical: true,
        className: 'main_background',
        children: [profile_and_sysmonitors(),drive_monitor(), quicksettings_main_box],
    })

})


function widget_box(monitor = 0){
//const widget_box = (monitor = 2) => 
    return Widget.Window({
    monitor,
    anchor: ['top', ],
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
        child: widget_revelead_box,

    })  //Widget.Label({ label: date.bind() })
})}


function fedora_button(){
    return Widget.Button({
        child: fedora_icon(),
        css: 'background-color: grey;',
        onPrimaryClick:  () => {
            console.log('Button clicked');
            if (widget_revelead_box.revealChild) {
                widget_revelead_box.revealChild = false;
                console.log('revealChild set to false');
                console.log(widget_revelead_box.revealChild)
            } else {
                widget_revelead_box.revealChild = true;
                console.log('revealChild set to true');
                console.log(widget_revelead_box.revealChild)
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

App.config({windows: [create_my_bar(2)]})
App.config({windows: [create_my_bar(1)]})
//App.config({windows: [widget_box(1)]})
App.config({windows: [widget_box(0)]})
// App.config({windows: [widget_box(2)]})
