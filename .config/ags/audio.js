const audio = await Service.import('audio')

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

function SinkItem(stream){

    console.log("This is the stream shit *************88*********************")
    console.log(audio)
    console.log(stream.name)
    return Widget.Label({
        css: "font-size: 20px; font-color: white",
        label: stream.description});
}
// export const SinkSelector = Widget.Button({
//     on_clicked: () => audio.speaker.is_muted = !audio.speaker.is_muted,
//     child: Widget.Icon().hook(audio.speaker, self => {
//         console.log("This is the stream shit *************98********************************")
//         console.log(audio.speaker)
//         console.log(audio.speakers)
//         const vol = audio.speaker.volume * 100;
//         const icon = [
//             [101, 'overamplified'],
//             [67, 'high'],
//             [34, 'medium'],
//             [1, 'low'],
//             [0, 'muted'],
//         ].find(([threshold]) => threshold <= vol)?.[1];

//         self.icon = `audio-volume-${icon}-symbolic`;
//         self.tooltip_text = `Volume ${Math.floor(vol)}%`;
//     }),
// })



// export const SinkSelector = Widget.Box({
//     css: 'min-height: 100px; min-width: 200px;',
//     vertical: true,
//     children://[
//         audio.bind("speakers").as(a => a.map(SinkItem)),
//         //Widget.Label({label: "hello"}),
//        // Widget.Label({label:String(audio.speaker)})
//    // ]
// })
export const main_volume = () => Widget.Box({

    className: 'main_volume_background',
    vertical: true,
    children:[
        Widget.Box({
            vertical: false,
            children: [
                // Widget.Label({
                //     vpack: 'start',
                //     hpack: 'center',
                //     label: 'Volume',
                //     //className: 'volume_label',
                // }),
                Widget.Slider({
                    vpack: 'fill',
                    hpack: 'center',
                    hexpand: true,
                    vexpand: true,
                    min: 0,
                    max: 1,
                    className: 'audio_main_slider',
                    value: audio.speaker.bind('volume'),
                    onChange: ({ value }) => audio.speaker.volume = value,
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
    onClicked: () => print("hello"),
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
