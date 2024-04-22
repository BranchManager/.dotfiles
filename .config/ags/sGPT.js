const { query } = await Service.import("applications")
const GLib = imports.gi.GLib;

let homeDirectory = GLib.get_home_dir();
//import {rev} from './vars.js'
const WINDOW_NAME = "applauncher"

const reveal = Variable(false)
const gptrev0 = Variable(false)
const gptrev1 = Variable(false)
const gptrev2 = Variable(false)
const gptrev3 = Variable(false)
const gptrev4 = Variable(false)
const keymode = Variable("on-demand")
const chat_blocks = Variable([])

//thus function gets called in the shell like: ags -r "open_close_gpt(true)" but handles the open and close of lthe launcher
globalThis.open_close_gpt = (open,monitor) => {
    console.log("global var")
   
    function close_gpt(){
        //App.closeWindow("launcherr"+monitor.toString())
        reveal.value = false
        Utils.timeout(200, () =>{
            App.closeWindow("GPT")
            //print(revealer.value)
        })

    }

    function timeout_and_reveal(){
        on_close_launcher(false,monitor)
        Utils.timeout(200, () =>{
            reveal.value = true
            print(reveal.value)

        })
    }

    if(!open){
        close_gpt()
       
       // on_close_launcher(false,monitor)
    }else if(open){
        keymode.value = "exclusive"
        App.openWindow("GPT")
        //App.openWindow("launcherr2")
        //const launcher = App.getWindow("launcherr1")
       // launcher.child.child.
       timeout_and_reveal()
    


    }
 
}
// globalThis.open_close_gpt = (open) => {
//     console.log("global var")
   

//     if(open){
//         keymode.value = "exclusive"
//         App.openWindow("GPT"),
//         print("OPENING GPT ON MONITOR")
        
//         reveal.value = true
//         Utils.timeout(200, () =>{
//             reveal.value = true
//             print(reveal.value)
//             print("OPENING GPT")

//         })
        
//     }else{
        
//         reveal.value = false
//         Utils.timeout(200, () =>{
//             App.closeWindow("GPT0")
//             App.closeWindow("GPT1")
//             App.closeWindow("GPT2")
//         })
//         print(reveal.value)
//     }
// }


/** @param {import('resource:///com/github/Aylur/ags/service/applications.js').Application} app */



const AppItem = app => Widget.Button({
    className: "app_item",

    //if we click on an app to open
    on_clicked: () => {
        App.closeWindow(WINDOW_NAME)
        app.launch()
        // App.getWindow("launcherr").keymode = 'none'
        // gpt_revealer.revealChild = false
        // App.closeWindow("launcherr")
        //on_close_launcher(false)

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



const Applauncher = ({ width = 500, height = 500, spacing = 12, monitor = 0 }) => {


    function run_gpt(text){
        print("THIS IS THE GP T TEXT")
        print(text)

        const query = query_box(text)
        chat_blocks.value = chat_blocks.value.concat(query)

        const response = response_box("Thinking...")
        chat_blocks.value = chat_blocks.value.concat(response)
        
        Utils.execAsync([`python3`,`${App.configDir}/scripts/rag_client.py`, `${text}`])
        
        .then((res) => {
            //create a chat box dynamically wiht the results from the gpt
            //see if you can append to the chat blocks and update that in a child label widget
            console.log("THIS IS THE GPT RESPONSE")
            console.log(res)

            //const query = query_box(res)gpt
            //chat_blocks.value = chat_blocks.value.concat(query)

            //response.children[1].maxWidthChars = 25
            response.children[1].label = res //reduce_gpt_response(res, 25)
        
            
            //chat_blocks.value = res.split("\n")
        })
        .catch((err) => {
            console.log("ERRRRRRRRR");
            console.log(err)
            response.children[1].label = err
        
        })
    
    }

    function savechat(array){
        print("SAVING CHAT")
    
        //loop through the array and save the chat to a file
        var text_to_write = ""
       
        for (let i = 0; i < array.length; i++) {
            print(array[i].className)
            if (array[i].className == "gpt_query"){
               
                 text_to_write += `Query: ${array[i].children[1].label}\n`
            }else{
                 text_to_write += `AI: ${array[i].children[1].label}\n`
            }
            
            
        }
        if (text_to_write != ""){
            try {
                let homeDirectory = GLib.get_home_dir();
    
                GLib.file_set_contents(`${homeDirectory}/chat.txt`, text_to_write);
                const response = response_box(`Chat saved to ${homeDirectory}/chat.txt please copy file or move it to a safe location before saving another chat.`)
                chat_blocks.value = chat_blocks.value.concat(response)
                print("File written successfully");
            } catch (err) {
                const response = response_box(`There was an error saving the chat to ${homeDirectory}/chat.txt check stdout for more info.`)
                chat_blocks.value = chat_blocks.value.concat(response)
                print(`Error writing file: ${err}`);
            }
        }else{
            const response = response_box(`There was no chat to save.`)
            chat_blocks.value = chat_blocks.value.concat(response)
        }
    }


    // list of application buttons
    let applications = query("").map(AppItem)



    const query_box = (text) => {
        return Widget.Box({
            className: "gpt_query",
            children:[Widget.Icon({
                className: "chat_icon",
                icon: "chat-blue",
                size: 40
                }),
                
                Widget.Label({
                wrap: true,
                useMarkup: true,
                maxWidthChars: 50,
                label: text,
                xalign: 0,
                vpack: "center",
                hpack: "start",
                //truncate: "end",
            })]
        })

    }

    const response_box = (text) => {
        return Widget.Box({
            hexpand: false,
            vexpand: false,
            className: "gpt_response",
            children: [Widget.Icon({
                className: "chat_icon",
                icon: "lavendar_brain",
                size: 40
                }),
            
                Widget.Label({
                    wrap: true,
                    maxWidthChars: 50,
                    label: text,
                    xalign: 0,
                    hexpand: false,
                    vexpand: false,
                    hpack: "start",
                    vpack: "center",
                    //truncate: "end",
                }),
            ]
        })

    }

    // repopulate the box, so the most frequent apps are on top of the list
  

    const Ai_label = Widget.Box({
        hpack: "center",
        spacing: 10,
        children:[Widget.Icon({
            css: "margin: 10px;",
            icon: "lavendar_brain", size: 72
        }),
        Widget.Label({
            className: "ai_label",
            label: "AI Assistant"
        })]
    })



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
               placeholderText: "Got a question ? Ask me ...",

                // to launch the first item on Enter
                on_accept: ({text}) => {
                    print("THIS IS THE APP LAUNCHED GPT")
                    run_gpt(text)
                    // make sure we only consider visible (searched for) applications
                    // const results = applications.filter((item) => item.visible);
                    //     if (results[0]) {
                    //         //App.toggleWindow(WINDOW_NAME)
                    //         print("THIS IS THE APP LAUNCHED")
                    //         print(applications[0].attribute.app.name)
                    //         print(results[0].attribute.app.name)
                    //         results[0].attribute.app.launch()
                    //         // App.getWindow("launcherr").keymode = 'none'
                    //         // gpt_revealer.revealChild = false
                    //         // App.closeWindow("launcherr")
                    //        // on_close_launcher(false)
                    //         //applications[0].attribute.app.launch()
                    //     }
                },

                // filter out the list
                // on_change: ({ text }) => applications.forEach(item => {
                //     item.visible = item.attribute.app.match(text ?? "")
                // }),
            })
        ]
    })

    const convo_box = Widget.Box({
        spacing: 10,
        vertical: true,
        className: "convo_box",
       
       children: chat_blocks.bind()
    })

    const clear_button = Widget.Button({
        hexpand: true,
        className: "save_clear_item",
        label: "Clear convo",
        on_clicked: () => chat_blocks.value = [],
        child:Widget.Box({
            child: Widget.Label({
                label: "Clear convo",
            })
        })
    })

    const save_button = Widget.Button({
        hexpand: true,
        className: "save_clear_item",
        label: "Save convo",
        on_clicked: () => {
            savechat(chat_blocks.value)
            // const convo = chat_blocks.value.map(item => item.children[1].label).join("\n")
            // Utils.execAsync([`${App.configDir}/scripts/save_convo.sh`, `${convo}`])
            // .then((res) => {console.log(res)})
            // .catch((err) => {console.log(err)})
        },
        child:Widget.Box({
            child: Widget.Label({
                label: "Save convo",
            })
        })
    })

    const close_button = Widget.Button({
        className: "ai_close_button",
        
        on_clicked: () => {
            open_close_gpt(false,monitor)
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

    const clear_n_save_buttons = Widget.Box({
        vertical: false,
        children: [clear_button,save_button]
    })

    return Widget.Box({
        vertical: true,
        //css: `margin: ${spacing * 2}px;`,
        children: [
            Ai_label,
            entry,
            Widget.Scrollable({
                className: "launcher_list",
                hscroll: "never",
                css: `min-width: ${width}px;`
                    + `min-height: ${height}px;`,

                child: convo_box,
            }),
            clear_n_save_buttons,
            close_button,
            
            
            // wrap the list in a scrollable
            // Widget.Scrollable({
            //     className: "launcher_list",
            //     hscroll: "never",
            //     css: `min-width: ${width}px;`
            //         + `min-height: ${height}px;`,
            //     child: list,
            // }),
        ],
 
    })
}

// there needs to be only one instance
function pick_monitor(monitor){

    switch(monitor){
        case 0:
            return gptrev0
        case 1:
            return gptrev1
        case 2:
            return gptrev2
        case 3:
            return gptrev3
        case 4:
            return gptrev4
    }
}


export const gpt_revealer = (monitor) => Widget.Revealer({
    revealChild: reveal.bind(),//pick_monitor(monitor).bind(),
    transitionDuration: 100,
    transition: 'slide_right',
    child: Widget.Box({
        
        vertical: true,
        className: 'alt_main_background',
        child: Applauncher({
            width: 400,
            height: 500,
            spacing: 12,
            monitor: monitor
        }),
        //children: [search_header(),AppsList()]
    })

})

export function GPT_box(monitor){
    //const widget_box = (monitor = 2) => 
        const monitor_name = "GPT"
        print("MONITOR NAME") 
        print("monitorsin Range^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^: " + monitor_name)

        return Widget.Window({
        monitor,
        anchor: ['left','top' ],
        name: monitor_name, // this name has to be unique
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
            child: gpt_revealer(monitor),
    
        }) , //Widget.Label({ label: date.bind() })
        setup: self => self.keybind("Escape", () => {
            print("REVEALER")
            print(gpt_revealer.revealChild)
            
            //gpt_revealer.revealChild = false;
            //self.keymode = 'none'
           
            open_close_gpt(false,monitor)
           
           
        })

     })
}


//on run model first
/* 1 create label box with your prompt and add to the chat blocks
2 inference model and ge tthe return value
3 add the return value to the chat blocks
*/