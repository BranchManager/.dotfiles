
const { query } = await Service.import("applications")
const WINDOW_NAME = "applauncher"


// Thiese are used to determine which monitor the launcher is on and if it is open or closed
const rev0 = Variable(false)
const rev1 = Variable(false)
const rev2 = Variable(false)
const rev3 = Variable(false)
const rev4 = Variable(false)
const keymode = Variable("exclusive")


//thus function gets called in the shell like: ags -r "on_close_launcher(true)" but handles the open and close of lthe launcher
globalThis.on_close_launcher = (open,monitor) => {
    console.log("global var")
   
    // this handles the closing of the launcher
    function close_launcher(revealer){
        
        //the timer is used for the revealer to close before the window closes
        revealer.value = false
        Utils.timeout(200, () =>{
            App.closeWindow("launcherr"+monitor.toString())
           
        })

    }

    //this function is used to open the launcher and close the gpt
    function timeout_and_reveal(revealer){
        open_close_gpt(false,monitor)
        Utils.timeout(200, () =>{
            revealer.value = true
         

        })
    }

    //if the open variable is false then close all the launchers
    if(!open){
        close_launcher(rev0)
        close_launcher(rev1)
        close_launcher(rev2)
        close_launcher(rev3)
        close_launcher(rev4)
      
    //if the open variable is true then open the launcher and set the keymode to exclusive
    }else if(open){
        keymode.value = "exclusive"
        App.openWindow("launcherr"+monitor.toString())
     
        //this switch statement is used to determine which monitor the launcher is on
       switch(monitor){
            case 0:
                timeout_and_reveal(rev0)
                break;
            case 1:
                timeout_and_reveal(rev1)
                break;
            case 2:
                timeout_and_reveal(rev2)
                break;
            case 3:
                timeout_and_reveal(rev3)
                break;
       }


    }
 
}

//idk what thid linde does pulled it from aylurs code
/** @param {import('resource:///com/github/Aylur/ags/service/applications.js').Application} app */

//this function is used to create each of the app buttons
const AppItem = (app,monitor) => Widget.Button({
    className: "app_item",

    //if we click on an app, open it and close the launcher
    on_clicked: () => {
        App.closeWindow(WINDOW_NAME)
        app.launch()
        on_close_launcher(false, monitor)

    },
    attribute: { app },
    child: Widget.Box({
        
        children: [
            Widget.Icon({
                icon: app.icon_name || "",
                size: 42,
            }),
            Widget.Label({
                class_name: "title",
                label: app.name,
                xalign: 0,
                vpack: "center",
                truncate: "end",
            }),
        ],
    }),
})


//This is the main applauncher function
const Applauncher = ({ width = 500, height = 500, spacing = 12,monitor = 0 }) => {

    // create the list of applications. for each application, create a button
    let applications = query("").map((app) => AppItem(app,monitor))

    // container holding the buttons
    const list = Widget.Box({
        
        vertical: true,
        children: applications,
        spacing,
    })

    // repopulate the box, so the most frequent apps are on top of the list
    function repopulate() {
        applications = query("").map((app) => AppItem(app,monitor))
        list.children = applications
    }



    // search entry
    const entry = Widget.Box({
    
        children:[
            Widget.Label({
                className: "search_icon",
                label: ""
            }),
            Widget.Entry({
                hexpand: true,
               className: "launcher_input",
                
                // to launch the first item on Enter
                on_accept: () => {
                    // make sure we only consider visible (searched for) applications
                    const results = applications.filter((item) => item.visible);
                        if (results[0]) {
                            
                         
                            results[0].attribute.app.launch()
                            on_close_launcher(false,monitor)
                           
                        }
                },

                // filter out the list
                on_change: ({ text }) => applications.forEach(item => {
                    item.visible = item.attribute.app.match(text ?? "")
                }),
            })
        ]
    })

    //handles the close button
    const close_button = Widget.Button({
        className: "ai_close_button",
        
        on_clicked: () => {
            on_close_launcher(false,monitor)
        },
        child:Widget.Box({
            hpack: "center",
            child: Widget.Label({
                css:"font-size: 30px; font-weight: bold;",
                label: "Close",
            })
        })
    })

    return Widget.Box({
        vertical: true,
        children: [
            entry,

            // wrap the list in a scrollable
            Widget.Scrollable({
                className: "launcher_list",
                hscroll: "never",
                css: `min-width: ${width}px;`
                    + `min-height: ${height}px;`,
                child: list,
            }),
            close_button
        ],
        setup: self => self.hook(App, (_, windowName, visible) => {
            if (windowName !== WINDOW_NAME)
                return

            // when the applauncher shows up
            if (visible) {
                repopulate()
                entry.text = ""
                entry.grab_focus()
            }
        }),
    })
}

// there needs to be only one instance
function pick_monitor(monitor){

    switch(monitor){
        case 0:
            return rev0
        case 1:
            return rev1
        case 2:
            return rev2
        case 3:
            return rev3
        case 4:
            return rev4
    }

}


export const launcher_revealer = (monitor) => Widget.Revealer({
    revealChild: pick_monitor(monitor).bind(),
    
    transitionDuration: 100,
    css: "min-width: 300px; min-height: 300px; background-color: red",
    transition: 'slide_right',
    child: Widget.Box({
        
        vertical: true,
        className: 'alt_main_background',
        child: Applauncher({
            width: 340,
            height: 800,
            spacing: 12,
            monitor: monitor
        }),
        
    })

})

export function applauncher_box(monitor = 0){
    //const widget_box = (monitor = 2) => 
        return Widget.Window({
        monitor,
        anchor: ['left','top' ],
        name: "launcherr" + monitor.toString(),
        layer: 'overlay',
        keymode: keymode.bind(),
        
    
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
           child: launcher_revealer(monitor),
    
        }) , //Widget.Label({ label: date.bind() })
        setup: self => self.keybind("Escape", () => {
           
            on_close_launcher(false,monitor)
           
           
        })
    })
}

//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