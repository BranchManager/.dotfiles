// This is the button on the bar that has the icons for volume, notifications, and network status
//it is a button that when clicked will reveal the main_widget
const network = await Service.import('network')
const audio = await Service.import('audio')
const NotificationService = await Service.import('notifications')
import { main_widget } from './MainWidget.js';
import { get_weather} from '../weather.js'
import { get_quote_of_the_day } from '../quote_of_the_day.js';
import { power_widget, get_uptime } from '../power_menu.js';

//export function WidgetButton() {
const volume_indicator = Widget.Icon({
    
    clssName: audio.bind("volume").as(a => {
        return "audio_button_icon_widbutton"
    })

}).hook(audio.speaker, self => {
    //My guess is the hook executes the function every time the volume changes
    const vol = audio.speaker.volume * 100;
    const icon = [
        [101, 'overamplified'],
        [67, 'high'],
        [34, 'medium'],
        [1, 'low'],
        [0, 'muted'],
    ].find(([threshold]) => threshold <= vol)?.[1];

    
    const classname = (icon == 'muted') ? 'audio_button_icon_muted_widbutton':'audio_button_icon_widbutton'

    //setting the icon variables doens hwere once we check where the volume is
    self.icon = `audio-volume-${icon}-symbolic`;
    self.tooltip_text = `Volume ${Math.floor(vol)}%`;
    self.size = 20;
    self.className = classname
})

function NotificationIndicator() {
   
    //This handles displaying the notificaiton icon in the bar
    //if displayed then that means you have notifications
    const notif_icon_revealer = Widget.Revealer({
        transition: 'slide_right',

        child: Widget.Icon({size: 20, icon: 'Frappe-Sky-notification'})//Widget.Label({css:"color: red",label: "n"})
        
       
    }).hook(NotificationService, self => {
        const num_of_notifs = NotificationService.notifications.length
        if(num_of_notifs == 0 || num_of_notifs == undefined ){
            self.revealChild = false
            self.css = "min-width: 0px; min-height: 0px;"
        }else{
            self.css = "min-width: 0px; min-height: 0px;"
            self.revealChild = true
        }
    
    })

    return notif_icon_revealer


}

function NetworkIndicator() {
    const WifiIndicator = () => Widget.Box({
        children: [
            Widget.Icon({
                size: 20,
                icon: network.wifi.bind('icon_name'),
            }),
            
        ],
    })
    
    const WiredIndicator = () => Widget.Icon({
        size: 20,
        icon: network.wired.bind('icon_name'),
    })
    
    return Widget.Stack({
        children: {
            wifi: WifiIndicator(),
            wired: WiredIndicator(),
        },
        shown: network.bind('primary').as(p => p || 'wifi'),
    })
}





export const WidgetButton = () => Widget.Box({
    vertical: false,
    spacing: 5,
    children: [Widget.Button({
        className: 'Widget_button_box',
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
        },
        child:Widget.Box({
            vertical: false,
            spacing: 5,
            children: [
                volume_indicator,
                NotificationIndicator(),
                
                NetworkIndicator()
            ]
        }),

    }),
    Widget.Button({
        className: 'power_button',
        child: Widget.Icon({icon: 'power-red', size: 20}),
        onClicked: () => {
            get_uptime(),
           power_widget.revealChild = !power_widget.revealChild
        }
    })]
})
  
//}