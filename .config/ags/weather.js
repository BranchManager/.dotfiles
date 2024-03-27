
//These values change using get_weather() function which gets executed when the widget is slid out
var temp = Variable("")
var forcast_icon = Variable("")
var location = Variable("")
export function get_weather(){
    //var temp = ""
    Utils.execAsync(['python3', `${App.configDir}/scripts/weather.py`, '1'])
    .then((res) => {
        var forcast;
        console.log("getting tewmp******************");
        forcast = res.split(";")
        console.log(forcast)
        temp.value = forcast[0]
        forcast_icon.value = forcast[6]; 
        location.value = forcast[7]
        console.log(temp.value)

    })
    .catch((err) => {console.log("ERRRRRRRRR");console.log(err)})
    return temp
}

const sunrise_box = Widget.Box({
    vertical: true,
    hpack: 'start',
    hexpand: true,
    css: 'min-width: 70px;',
    children:[
        Widget.Label({
            label: '',
            css: 'font-size: 36px; margin-right: 10px;',
        }),
        Widget.Label({
            label: '6:00 AM',
            css: 'font-size: 16px;',
        }),
    ]

})

const sunset_box = Widget.Box({
    vertical: true,
    hpack: 'end',
    hexpand: true,
    css: 'min-width: 70px;',
    children:[
        Widget.Label({
            label: '',
            css: 'font-size: 36px; margin-right: 10px; ',
        }),
        Widget.Label({
            label: '6:00 PM',
            css: 'font-size: 16px;',
        }),
    ]
})

export const weather = () => Widget.Box({
    vertical: true,
    className: 'weather_main_box',
    children:[ Widget.Label({
        //vexpand:true, 
        hexpand:true,
        hpack: 'center', 
        vpack: 'start',
        visible: true,
        css: 'font-size: 16px; margin-bottom: -50px;margin-top: -25px;',
        label: location.bind()
    
        }),
        
        Widget.Overlay({
        overlays:[
            Widget.Icon({
                vexpand:true, 
                hexpand:true,
                hpack: 'center', 
                vpack: 'start',
                visible: true,
                css: 'font-size: 80px; color: green; opacity: 0.5; margin-top: 10px;',
                icon: forcast_icon.bind()//'windy-strong-svgrepo-com'

            }),Widget.Label({
                vexpand:true, 
                hexpand:true,
                hpack: 'center', 
                vpack: 'center',
                css: 'font-size: 44px; margin-top: 20px;',
                justification: 'center',
                label: temp.bind() ,//"60"
            }),
        ]

    }),
    Widget.Box({
        hpack: 'end',
        hexpand: true,
        vertical: false,
        children:[
            sunrise_box,
            sunset_box

        ]

    })

    ]


})