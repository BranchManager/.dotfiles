import {weather, get_weather} from '../weather.js'
import { get_quote_of_the_day,quote_of_the_day } from '../quote_of_the_day.js';
import { main_widget } from '../Bar/MainWidget.js';
import { create_workspace_indicator } from './Workspaces.js';
import { sysTray } from './Tray.js';
import { WidgetButton } from './WidgetButton.js';

App.applyCss(`${App.configDir}/Bar/bar.css`)


const GLib = imports.gi.GLib;

const endWidget = () =>Widget.Box({
    vertical: false,
    hpack: 'end',
    children: [sysTray(),
        Widget.Separator({
            className: "separator",
            orientation: 1,
           
        }),
        WidgetButton()]
})



const main_icon_and_workspaces = (monitor = 0) => Widget.Box({
    vertical: false,
    spacing: 5,
    children: [ai_button(monitor),fedora_button(), create_workspace_indicator(monitor)]

})

const new_date = () => Widget.Label({className:'BarDate'}).poll(1000, label => label.label = Utils.exec('date -d now +"%A %b %d %Y %l:%M%p %Z"'))


export function create_my_bar(monitor = 0){
    const main_box = Widget.CenterBox({
        className: 'main-box',
        
        startWidget: main_icon_and_workspaces(monitor),//create_workspace_indicator(monitor),
        centerWidget: new_date(), //Widget.Label({ label: count.toString()}),
        endWidget: endWidget()//sysTray(),//fedora_button(),
        //endWidget: NetworkIndicator(),
        

    })
    return Widget.Window({
        monitor,
        name: 'ggg' + monitor.toString(), // this name has to be unique
        anchor: ['top', 'left', 'right'],
        className: 'my_bar',
        layer: 'top',
        exclusivity: 'exclusive',
        child: main_box,
         //Widget.Label({ label: date.bind() })
    })

 
}

function ai_button(monitor){
    return Widget.Button({
        className: 'ai_button',
        child: ai_icon(),
        hexpand: false,
        
    }).hook(App, (self,windowName,visible) => {

        self.onClicked = () => {
            print("THE NAME OF THE WINDOW")
            print(App.windowName)
            on_close_launcher(false)
            //Utils.timeout(100, () =>{
                open_close_gpt(true,monitor)
           //})
        }

    }, 'window-toggled')
}


function fedora_button(){
    return Widget.Button({
        className: 'fedora_button',
        child: fedora_icon(),
        hexpand: false,
        
    }).hook(App, (self,windowName,visible) => {

        self.onClicked = () => {
            print("THE NAME OF THE WINDOW")
            print(windowName)
            open_close_gpt(false)
            on_close_launcher(true)
            
        }

    }, 'window-toggled')
}
function ai_icon(){
    return Widget.Icon({
    hexpand: true,
    hpack: 'start',
    name: 'fedora',
    visible: true,
    className: 'fedora_icon',
    icon: 'lavendar_brain',
    //css: 'color: green;',
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

