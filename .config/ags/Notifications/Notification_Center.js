const NotificationService = await Service.import('notifications')


export function notification_reveal_func(is_other_app_calling_mell){

    if (is_other_app_calling_mell){
        notification_revealer.revealChild = false;
        
    } else if (!is_other_app_calling_mell){

        //network_reveal_func(true);
        //bluetooth_reveal_func(true);

        //quicksettings_reveal = false;
        console.log('reveal_func');
        if (notification_revealer.revealChild) {
            notification_revealer.revealChild = false;

        } else {
        notification_revealer.revealChild = true;

        }
    }
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
                })
            
            //]

        }),]

    })
})

function get_notification_icon(dnd, num_of_notifs){

    print("this is the number of notifications")
    print(NotificationService.notifications.length)
    
    
    if (num_of_notifs > 0){

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
    }else{ //we have no notifications so just show the icon
        if (dnd){
            print("we are in the dnd section no notifications")
            return Widget.Box({
    
                vertical: false,
                child: Widget.Icon({
                    //className: 'notification_icon_dnd',
                    size: 50,
                    icon: 'Frappe-crust-dnd',
                }),
                
                
            })
        }
        else{
            return Widget.Box({
    
                vertical: false,
                child: Widget.Icon({
                    //className: 'notification_icon',
                    size: 100,
                    icon: 'Frappe-Sky-notification',
                }),
                
                
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
    child:  Utils.watch(get_notification_icon(NotificationService.dnd, NotificationService.dnd), NotificationService, () => {
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
