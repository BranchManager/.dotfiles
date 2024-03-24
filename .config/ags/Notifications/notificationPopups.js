const NotificationsService = await Service.import('notifications')

//how long the notification will be displayed
NotificationsService.popupTimeout = 7000
print("ags config dir")
print(App.configDir)
export default function Notification(notification) {

  

  function dissmissme(){
    print('dismissed')
    print(main_eventbox)
    
    print('dismissed')
    
    notification.dismiss()
  
  }

  function determine_icon(){
    if(notification.image){
      print("The Icon is here bish")
      print(notification.Icon)
      return `background-image: url("${notification.image}")`
    }else if(notification.urgency == "critical"){
      return `background-image: url("${App.configDir + '/assets/frappe-red-important-notification.svg'}")`
    }else{
      return `background-image: url("${App.configDir + '/assets/Frappe-Sky-notification.svg'}")`
    }
  }

  const Icon = Widget.Box({
    className: 'icon',
    
    css: determine_icon()
 
  })

  //get all the actions to the notification and add them as a button
  const actionsbox = Widget.EventBox({
    child: Widget.Box({
        children: notification.actions.map(action => Widget.Button({
          on_clicked: () => {notification.invoke(action.id);},
          className: "notif_action_button",
          child: Widget.Label(action.label),
        })),

    })
  })


  const AppName = Widget.Label({
    className: 'appname_notification',
    label: notification.appName.toUpperCase(),
    truncate: 'end',
    justification: 'left',
    maxWidthChars: 24,
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
    className: 'notification_body',
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

  const close_button = Widget.Button({
     hpack: 'end',
    hexpand: true,
     vpack: 'start',
    // vexpand: true,
    className: 'notification_close_button',
    onPrimaryClick: () => notification.close(),
    child: Widget.Label({
      label: 'x',
      className: 'notification_close_button_label'
    })
  })
    
    const main_eventbox =  
    Widget.Box({ 
      className: 'primary_popup_background',
        child: Widget.EventBox({
              onPrimaryClick: () => dissmissme(),
              child: Widget.Box({
              className: 'secondary_popup_background',
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
                      }),
                      actionsbox
                    
                  ]
                  }),
                  close_button
              ]
              }),

            
      })
    })
    
    
    return main_eventbox
    

}

