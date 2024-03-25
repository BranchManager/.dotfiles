const audio = await Service.import('audio')
import { network_reveal_func } from './network_functionality.js';
import {  bluetooth_reveal_func} from './bluetooth_functionality.js'
import { notification_reveal_func } from "./Notifications/Notification_Center.js";
// const SinkItem = (stream) => Widget.Button({
//     hexpand: true,
//     on_clicked: () => audio.speaker = stream,
//     child: Widget.Box({
//         css: "min-width: 200px; min-height: 200px;",
//         children: [
//             Widget.Label({label: stream.name}),
//         ],
//     }),
// })
console.log("This is the stream shit *************88")
console.log(audio['apps'])

export function audio_reveal_func(is_other_app_calling_me){

    if(is_other_app_calling_me){
        audio_revealer.revealChild = false;

    }else if (!is_other_app_calling_me){

        bluetooth_reveal_func(true);
        notification_reveal_func(true);
        network_reveal_func(true)

       audio_revealer.revealChild = !audio_revealer.revealChild
         
    }



}

function SinkItem(stream){

    function change_sink(){

    }

    function get_sink_icon(){
        if (stream.name == audio.speaker.name){
            console.log("STream Name ************************************************************")
            print("We got a match hoe")
            return Widget.Button({
                className: 'volume_active_sink',
                //onClicked: () => print("This is the current sink"),
                child:Widget.Label({
                    label:""
                })
            }).hook(audio,self =>{
                if (stream.name == audio.speaker.name){
                    self.child.label = ""
                    self.className = 'volume_active_sink'
                }else{
                    self.child.label = "-"
                    self.className = "volume_unactive_sink"
                    self.onClicked = () => audio.speaker = stream
                }
            })
            //return ""
        }else{
            console.log("STream Name ************************************************************")
            console.log(stream.name)
            return Widget.Button({
                tooltipText: "Click to change sink",
                cursor:"pointer",
                className: "volume_unactive_sink",
                //onClicked: () => audio.speaker = stream,
                child:Widget.Label({
                    label: "-"
                })
            }).hook(audio,self =>{
                if (stream.name == audio.speaker.name){
                    self.child.label = ""
                    self.className = 'volume_active_sink'
                    
                }else{
                    self.child.label = "-"
                    self.className = "volume_unactive_sink"
                    self.onClicked = () => audio.speaker = stream
                }
            })
            
        }
        
    }

    return Widget.Box({
        vertical:true,
        children:[Widget.Box({

            children:[
                get_sink_icon(),
            
                
            Widget.Label({
                justification: 'left',
                css: "font-size: 16px; color: white",
                maxWidthChars: 34,
                truncate: 'end',
                label: stream.description
            }),]
        }),
        Widget.Separator({className:'sep', orientation:0})]
    })
}

export var audio_revealer = Widget.Revealer({
    revealChild: false,

    child: Widget.Box({
        className: 'volume_revealer_box',
        vertical: true,
        children: [
            Widget.Box({
                
                children: [
                    Widget.Button({
                        hexpand: true,
                        hpack: 'start',
                        //onclicked popen pavucontrol and log error if any
                        onClicked: () => Utils.execAsync("pavucontrol").catch(err => {
                            console.error("pavucontrol", err)
                            return ""
                        }),
                        className: "pavucontrol_box",
                        child: Widget.Label({label:""})
                    }),
                    Widget.Label({hpack:"end", label:"Click the \"-\" to change output device" }),
                ]
            }),
            Widget.Separator({className:'sep', orientation:0}),
            Widget.Box({
                vertical: true,
                children: audio.bind("speakers").as(a => a.map(SinkItem)),
            }),
            //Widget.Box({vertical: false,className: 'sep',})

        ]


    })

})


//This controls the volume for for the two slider that appear by default under the quick settings buttons
export const main_volume_and_mic_sliders = () => Widget.Box({

    className: 'main_volume_background',
    vertical: true,
    spacing: 0,
    children:[
        Widget.Box({
            vertical: false,
            hexpand: true,
            vexpand: true,
            children: [
                Widget.Label({
                    vpack: 'start',
                    hpack: 'center',
                    label: 'Volume',
                    className: 'volume_label',
                }).hook(audio.speaker, self => { 
                    if (audio.speaker.is_muted){
                        self.label = '󰝟'
                    }else{
                        self.label = ''
                    }
                }),
                Widget.Slider({
                    vpack: 'fill',
                    hpack: 'center',
                    hexpand: true,
                    vexpand: true,
                    drawValue: false, //dumb that this is not in the docs on the widget page
                    min: 0,
                    max: 1,
                    className: 'audio_main_slider',
                    value: audio.speaker.bind('volume'),
                    onChange: ({ value }) => audio.speaker.volume = value,
                }),
                
            ]
        }),
        Widget.Box({
            vertical: false,
            hexpand: true,
            vexpand: true,
            children: [
                Widget.Label({
                    vpack: 'start',
                    hpack: 'center',
                    label: 'Balance',
                    className: 'volume_label',
                }).hook(audio.microphone, self => { 
                    if (audio.microphone.is_muted){
                        self.label = ''
                    }else{
                        self.label = '󰍬'
                    }
                }),
                Widget.Slider({
                    vpack: 'fill',
                    hpack: 'center',
                    hexpand: true,
                    vexpand: true,
                    drawValue: false, //dumb that this is not in the docs on the widget page
                    min: 0,
                    max: 1,
                    className: 'audio_main_slider',
                    value: audio.microphone.bind('volume'),
                    onChange: ({ value }) => audio.microphone.volume = value,
                })
            ]
        
        })
    ]
})
function check(widget){
    //console.log("volume thing ********************************************90")
    console.log(String(self.icon))
    return "audion_button_icon"

}
export const Audio_button = () => Widget.Button({
    className: 'quick_setting_button_box',
    onClicked: () => audio_reveal_func(false),
    child: Widget.Icon({
        clssName: audio.bind("volume").as(a => {
            return "audio_button_icon"
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

        console.log("volume thing ********************************************90");
        const classname = (icon == 'muted') ? 'audio_button_icon_muted':'audio_button_icon'

        //setting the icon variables doens hwere once we check where the volume is
        self.icon = `audio-volume-${icon}-symbolic`;
        self.tooltip_text = `Volume ${Math.floor(vol)}%`;
        self.size = 50;
        self.className = classname//(self.icon == 'muted') ? 'audio_button_icon_muted':'audio_button_icon'
    }),


})


// Menu({
//     name: "sink-selector",
//     icon: icons.audio.type.headset,
//     title: "Sink Selector",
//     content: [
//         Widget.Box({
//             vertical: true,
//             children: audio.bind("speakers").as(a => a.map(SinkItem)),
//         }),
//         Widget.Separator(),
//         SettingsButton(),
//     ],
// })
