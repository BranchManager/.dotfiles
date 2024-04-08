
const { query } = await Service.import("applications")
//import {rev} from './vars.js'
const WINDOW_NAME = "applauncher"

const rev = Variable(false)
const keymode = Variable("on-demand")
//thus function gets called in the shell like: ags -r "on_close_launcher(true)" but handles the open and close of lthe launcher
globalThis.on_close_launcher = (open) => {
    console.log("global var")
   

    if(open){
        keymode.value = "exclusive"
        App.openWindow("launcherr")
        Utils.timeout(200, () =>{
            rev.value = true
            print(rev.value)

        })
        
    }else{
        keymode.value = "none"
        rev.value = false
        Utils.timeout(200, () =>{
            App.closeWindow("launcherr")
        })
        print("closing launcher")
        print(rev.value)
    }
}

/** @param {import('resource:///com/github/Aylur/ags/service/applications.js').Application} app */
const AppItem = app => Widget.Button({
    className: "app_item",

    //if we click on an app to open
    on_clicked: () => {
        App.closeWindow(WINDOW_NAME)
        app.launch()
        // App.getWindow("launcherr").keymode = 'none'
        // launcher_revealer.revealChild = false
        // App.closeWindow("launcherr")
        on_close_launcher(false)

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

const Applauncher = ({ width = 500, height = 500, spacing = 12 }) => {
    // list of application buttons
    let applications = query("").map(AppItem)

    // container holding the buttons
    const list = Widget.Box({
        
        vertical: true,
        children: applications,
        spacing,
    })

    // repopulate the box, so the most frequent apps are on top of the list
    function repopulate() {
        applications = query("").map(AppItem)
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
               // css: `margin-bottom: ${spacing}px;`,
               className: "launcher_input",

                // to launch the first item on Enter
                on_accept: () => {
                    // make sure we only consider visible (searched for) applications
                    const results = applications.filter((item) => item.visible);
                        if (results[0]) {
                            //App.toggleWindow(WINDOW_NAME)
                            print("THIS IS THE APP LAUNCHED")
                            print(applications[0].attribute.app.name)
                            print(results[0].attribute.app.name)
                            results[0].attribute.app.launch()
                            // App.getWindow("launcherr").keymode = 'none'
                            // launcher_revealer.revealChild = false
                            // App.closeWindow("launcherr")
                            on_close_launcher(false)
                            //applications[0].attribute.app.launch()
                        }
                },

                // filter out the list
                on_change: ({ text }) => applications.forEach(item => {
                    item.visible = item.attribute.app.match(text ?? "")
                }),
            })
        ]
    })

    const close_button = Widget.Button({
        className: "ai_close_button",
        
        on_clicked: () => {
            on_close_launcher(false)
            // const convo = chat_blocks.value.map(item => item.children[1].label).join("\n")
            // Utils.execAsync([`${App.configDir}/scripts/save_convo.sh`, `${convo}`])
            // .then((res) => {console.log(res)})
            // .catch((err) => {console.log(err)})
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
        //css: `margin: ${spacing * 2}px;`,
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


export const launcher_revealer = Widget.Revealer({
    revealChild: rev.bind(),
    transitionDuration: 100,
    transition: 'slide_right',
    child: Widget.Box({
        
        vertical: true,
        className: 'alt_main_background',
        child: Applauncher({
            width: 340,
            height: 1000,
            spacing: 12,
        }),
        //children: [search_header(),AppsList()]
    })

})

export function applauncher_box(monitor = 0){
    //const widget_box = (monitor = 2) => 
        return Widget.Window({
        monitor,
        anchor: ['left','top' ],
        name: "launcherr", //+ monitor.toString(),
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
            child: launcher_revealer,
    
        }) , //Widget.Label({ label: date.bind() })
        setup: self => self.keybind("Escape", () => {
            print("REVEALER")
            print(launcher_revealer.revealChild)
            
            //launcher_revealer.revealChild = false;
            //self.keymode = 'none'
           
            on_close_launcher(false)
           
           
        })
    })
}

//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