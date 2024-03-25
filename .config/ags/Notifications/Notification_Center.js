const NotificationService = await Service.import('notifications')
import Notification_maker from "./notificationPopups.js"
import {network_reveal_func } from "../network_functionality.js";
import {bluetooth_reveal_func } from "../bluetooth_functionality.js";
import {  audio_reveal_func } from "../audio.js";

export function notification_reveal_func(is_other_app_calling_mell){

    if (is_other_app_calling_mell){
        notification_revealer.revealChild = false;
        
    } else if (!is_other_app_calling_mell){

        network_reveal_func(true);
        bluetooth_reveal_func(true);
        audio_reveal_func(true);

        //quicksettings_reveal = false;
        console.log('reveal_func');
        notification_revealer.revealChild = !notification_revealer.revealChild
        
    }
}
function NoNotification() {
    const Icon = Widget.Label({
      //className: 'icon',
      css: 'font-size: 34px;',
      label: '󰂛'
    })
  
    const Text = Widget.Label({
      //className: 'text',
      justification: 'center',
      css: 'font-size: 34px;',
      label: 'No Notification'
    })
  
    return Widget.Box({
      className: 'no_notifications',
      hpack: 'center',
      vpack: 'center',
      vexpand: true,
      hexpand: true,
      vertical: true,
      children: [
        Icon,
        Text
      ]
    })
  }

export const notification_revealer = Widget.Revealer({
    revealChild: false, 
    child: Widget.Box({
        //hpack: 'end',
        vertical: true,
        children: [
            // Widget.Box({
            //     hpack: 'start',
            //     child: Widget.Button({
            //         //className: 'notification_clear_button',
            //         label: 'Clear All notifications',
            //         onClicked: () => NotificationService.clear(),
            //     }),
            // }),
            
            Widget.CenterBox({
           
                
                vertical: false,
                vexpand: false,
                //hexpand: true,
                // css: 'min-width: 440px',
                //children: [
                   startWidget: Widget.Box({
                        hpack: 'start',
                        hexpand: true,
                        //css: 'min-width: 240px',
                        child: Widget.Button({
                            
                            className: 'notification_clear_button',
                            label: 'Clear All notifications',
                            onClicked: () => NotificationService.clear(),
                        }),
                    }),
                    
                    endWidget: Widget.Switch({
                        hpack: 'end',
                        //hexpand: true,
                        vexpand: false,
                        active: NotificationService.bind('dnd').as(dnd => dnd),
                        className: 'bluetooth_toggle_slider',
                        onActivate: () =>{if(NotificationService.dnd){NotificationService.dnd = false}else{NotificationService.dnd = true}},
                    }),
            
            //]

            }),
            Widget.Box({
            className: 'notification_center_box_background',
            vexpand: true,
            hexpand: true,
            child: Widget.Scrollable({
                vscroll: 'always',
                hscroll: 'never',
                css: 'min-height: 400px;',
                
                    child: Widget.Box({
                        vertical: true,
                        children: NotificationService.bind('notifications')
                            .transform(notifications =>
                            notifications.length > 0
                                ? notifications.map(Notification_maker)
                                : [ NoNotification() ]
                            )
                    })
                // child: Widget.Label({
                //     wrap: true,
                //     label:'Lorem ipsum dolor sit amet, ' +
                // 'officia excepteur ex fugiat reprehenderit enim ' +
                // 'labore culpa sint ad nisi Lorem pariatur mollit'}),
                // })
        
        

            })
        })
        ]

    })
})

function get_notification_icon(dnd, num_of_notifs){

    print("this is the number of notifications")
    print(NotificationService.notifications.length)
    
    
    
    if(num_of_notifs == 0 || num_of_notifs == undefined){ //we have no notifications so just show the icon
        if (dnd){
            print("we are in the dnd section no notifications")
            print(typeof num_of_notifs)
            return Widget.Box({
    
                vertical: false,
                children: [
                // Widget.Label({
                //     className: 'notification_label_dnd',
                //     yalign: 0,
                //     label: String(num_of_notifs),
                // }),    
                Widget.Icon({
                   className: 'notification_icon_dnd_none',
                    size: 50,
                    icon: 'Frappe-crust-dnd',
                }),
                
                ]
            })
        }
        else{
            return Widget.Box({
    
                vertical: false,
                children: [ Widget.Icon({
                    className: 'notification_icon_none',
                    size: 50,
                    icon: 'Frappe-Sky-notification',
                })]

            })
            

                
        }
    }else{
        if (dnd){
            return Widget.Box({
    
                vertical: false,
                children: [
                Widget.Label({
                    className: 'notification_label_dnd',
                    yalign: 0,
                    label: String(num_of_notifs),
                }),    
                Widget.Icon({
                    className: 'notification_icon_dnd',
                    size: 50,
                    icon: 'Frappe-crust-dnd',
                }),
                
                ]
            })
        } else{
            
            return Widget.Box({
                
                vertical: false,
                children: [
                Widget.Label({
                    className: 'notification_label',
                    yalign: 0,
                    label: String(num_of_notifs),
                }),    
                Widget.Icon({
                    className: 'notification_icon',
                    size: 50,
                    icon: 'Frappe-Sky-notification',
                }),
                
                ]
            })
        }
    }

    

}

function test_func(){
    NotificationService.clear()
    NotificationService.dnd = true
}

export const Notification_button = () => Widget.Button({
    className: 'quick_setting_button_box',
    onClicked: () => notification_reveal_func(false),//print("reveal notifications"), //bluetooth_reveal_func(false),
    child:  Utils.watch(get_notification_icon(NotificationService.dnd, NotificationService.length), NotificationService, () => {
        return get_notification_icon(NotificationService.dnd, NotificationService.notifications.length)
    })
    
    
    //     Widget.Icon({
    //     className: 'bluetooth_button_icon_nobt',
    //    size: 90,

       // This wathces the state of bluetooth and changes the icon accordingly
       //utils.watch will set the icon to the initial value which is the return value of the check_blue function
        //icon: 
        
        
    //     Utils.watch(check_blue()[0], bluetooth, () => { 
    //             if(bluetooth.enabled)
    //                 return bluetooth_icon_on
    //             if(!bluetooth.enabled)
    //                 return bluetooth_icon_off
    //             // Not sure of lthis return statement will ever return, maybe if the machine does not have bluetooth
    //             return bluetooth_icon_off
    //             })

    // })
    
 })
