
/*
* This script is used to get the weather data from the weather.py script and display it on the widget
*/
var temp = Variable("")
var forcast_icon = Variable("")
var location = Variable("")
var sunrise = Variable("")
var sunset = Variable("")

//This calls the weather.py script and gets the weather data
export function get_weather(){
    
    Utils.execAsync(['python3', `${App.configDir}/scripts/weather.py`, '1'])
    .then((res) => {
        var forcast;
      
        forcast = res.split(";")
       
        temp.value = forcast[0]
        forcast_icon.value = forcast[6]; 
        location.value = forcast[7]

        var sr = forcast[4]
        var ss = forcast[5]

        if (ss.charAt(0) === '0') { //remove leading 0
            ss = ss.slice(1);
        }

        if (sr.charAt(0) === '0') {
            sr = sr.slice(1);
        }
        
        sunrise.value = sr 
        sunset.value = ss 



    })
    .catch((err) => {console.log("ERRRRRRRRR");console.log(err)})
    return temp
}

const sunrise_box = Widget.Box({
    vertical: true,
    hpack: 'start',
    hexpand: true,
    css: 'min-width: 50px;',
    children:[
        Widget.Label({
            label: '',
            css: 'font-size: 36px; margin-right: 10px;margin-top: -20px; margin-bottom: -13px;',
        }),
        Widget.Label({
            label: sunrise.bind(),
            css: 'font-size: 12px;',
        }),
    ]

})

const sunset_box = Widget.Box({
    vertical: true,
    hpack: 'end',
    hexpand: true,
    css: 'min-width: 50px;',
    children:[
        Widget.Label({
            label: '',
            css: 'font-size: 36px; margin-right: 10px; margin-top: -20px; margin-bottom: -13px;',
        }),
        Widget.Label({
            label: sunset.bind(),
            css: 'font-size: 12px;',
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
        css: 'font-size: 16px;margin-top: 0px;',
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
                css: 'font-size: 80px; color: green; opacity: 0.5; margin-top: -10px; margin-bottom: 21px;',
                icon: forcast_icon.bind()

            }),Widget.Label({
                vexpand:true, 
                hexpand:true,
                hpack: 'center', 
                vpack: 'center',
                css: 'font-size: 44px; margin-top: 10px; margin-bottom: 10px;',
                justification: 'center',
                label: temp.bind() ,
            }),
        ]

    }),
    Widget.Box({
        vpack: 'end',
        hexpand: true,
        vertical: false,
        children:[
            sunrise_box,
            sunset_box

        ]

    })

    ]


})