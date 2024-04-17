/* This file handles the volume indicator when using the keybinding shortcuts */
const audio = await Service.import('audio')

const reveal = Variable(false)
// ags -r "open_close_volume_indicator()" to tun the function jpass in true to increase volume and false to decrease volume
var stop = 0
globalThis.open_close_volume_indicator = (up) => {
    console.log("global var")
   

        
        if(up && audio.speaker.volume < 1){
            audio.speaker.volume += 0.1
        }else if(!up && audio.speaker.volume > 0){
            audio.speaker.volume -= 0.1
        }

        print(audio.speaker.volume)
        
       
        if(stop != 0){
            print("CLEARING TIMEOUT")
            print(stop)
            clearTimeout(stop)
        }
        reveal.value = true
        stop = Utils.timeout(5000, () =>{
            reveal.value = false
            print(reveal.value)
            print("OPENING GPT")
            print(stop)
            stop = 0
            

        })

        print(stop)
        
   
}

const indicator = Widget.Box({
    child: Widget.Icon({
        css: `padding-left: 10px;`,
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

        
        const classname = 'audio_shortcut_icon'

        //setting the icon variables doens hwere once we check where the volume is
        self.icon = `audio-volume-${icon}-symbolic`;
        self.tooltip_text = `Volume ${Math.floor(vol)}%`;
        self.size = 25;
        self.className = classname
    }),
})

const slider = Widget.Slider({
    vpack: 'fill',
    hpack: 'center',
    hexpand: true,
    vexpand: true,
    drawValue: false, 
    min: 0,
    max: 1,
    className: 'audio_shortcut_slider',
    value: audio.speaker.bind('volume'),
    onChange: ({ value }) => audio.speaker.volume = value,
})

const volume_revealer = Widget.Revealer({
    revealChild: reveal.bind(),
    transitionDuration: 500,
    transition: 'slide_up',
    child: Widget.Box({
        className: "volume_indicator_bg",
        child:Widget.Overlay({
            passThrough: true,
            overlays:[slider, indicator]
        })

    })
})

const main_box = () => Widget.Box({
             
    homogeneous: false,
    vertical: false,
    vpack: "end",
    hpack: "start",

    css: `background-color: rgba(0,0,0,0); padding: 0.1px;`,

    child: volume_revealer,
}) 

export const Volume_Shortcut_Indicator = (monitor = 0) => {

    print("Volume_Indicator")

    return Widget.Window({
        monitor,
        anchor: ['bottom' ],
        name: "volume_indicator"+ monitor.toString(), 
        layer: 'overlay',

       child: main_box(),

    })
}