const NotificationsService = await Service.import('notifications')

NotificationsService.popupTimeout = 7000
print("ags config dir")
print(App.configDir)
export default function Notification(notification) {

  function dissmissme(){
    print('dismissed')
    print(main_eventbox)
    //main_eventbox.revealChild = false
    print('dismissed')
    //print(self)
    notification.dismiss()
  }

  function determine_icon(){
    if(notification.image){
      print("The Icon is here bish")
      print(notification.Icon)
      return `background-image: url("${notification.image}")`
    }else{
      return `background-image: url("${App.configDir + '/assets/Frappe-Sky-notification.svg'}")`
    }
  }

  const Icon = Widget.Box({
    className: 'icon',
    //css: `background-image: url("${notification.image ?? App.configDir + '/assets/frappe-crust-moon.svg'}")`
    css: determine_icon()
    //`background-image: url("${notification.Icon ?? App.configDir + '/assets/macchiato_blue_gpu.svg'}")` //does not work ?
    //css: `background-image: url('/home/noah/.config/ags/assets/macchiato_blue_gpu.svg')`
  })

  

  const AppName = Widget.Label({
    className: 'appname_notification',
    label: notification.appName.toUpperCase(),
    truncate: 'end',
    justification: 'left',
    maxWidthChars: 16,
    xalign: 0
  })

  const Summary = Widget.Label({
    className: 'summary',
    label: notification.summary,
    justification: 'left',
    maxWidthChars: 40,
    truncate: 'end',
    xalign: 0,
    useMarkup: true
  })

  const Body = Widget.Label({
    className: 'body',
    label: `- ${notification.body}`,
    justification: 'left',
    maxWidthChars: 24,
    truncate: 'end',
    lines: 2,
    xalign: 0,
    wrap: true,
    useMarkup: true,
    hexpand: false
  })
    
    const main_eventbox =  
    Widget.Box({ 
      className: 'primary_popup_background',
        child: Widget.EventBox({
              onPrimaryClick: () => dissmissme(),//() => notification.dismiss(),
              child: Widget.Box({
              className: 'secondary_popup_background',//`notification ${notification.urgency}`,
              spacing: 8,
              children: [
                  Icon,
                  Widget.Box({
                  className: 'meta',
                  vertical: true,
                  spacing: 4,
                  children: [
                      AppName,
                      Widget.Box({
                      vertical: true,
                      children: [
                          Summary,
                          Body
                      ]
                      })
                  ]
                  })
              ]
              })
      })
    })
    
    
    //})
    return main_eventbox
    
   //return main_eventbox
}



// function Notifications() {
//   return Widget.Box({
//     //className: 'notification_popups',
//     vertical: true,
//     spacing: 4,
//     children: NotificationsService.bind('popups').as(popups => popups.map(Notification))
//   })
// }

// export default Widget.Window({
//   name: 'notifications',
//   anchor: ['top', 'right'],
//   child: 
//   Widget.Box({

//   css: `padding: 0.1px`,
//     //child: Widget.Revealer({
//         //revealChild: true,
//         //transition: "slide_left",
//         //transitionDuration: 7000,
//         child:  Widget.Box({
//           child: Notifications()
//         })
//     //})
//   })
// })
