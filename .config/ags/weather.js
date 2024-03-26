
// const temp = Variable('weather', {
//     listen: ['python3', './scripts/weather.py'],
// })
var temp = Variable("")
var forcast_icon = Variable("")
export function get_weather(){
    //var temp = ""
    Utils.execAsync(['python3', './scripts/weather.py', '1'])
    .then((res) => {
        var forcast;
        console.log("getting tewmp******************");
        forcast = res.split(" ")
        console.log(forcast)
        temp.value = forcast[0]
        forcast_icon.value = forcast[8]; 
        console.log(temp.value)

    })
    .catch((err) => {console.log("ERRRRRRRRR");console.log(err)})
    return temp
}


export const weather = () => Widget.Box({

className: 'weather_main_box',
child: Widget.Overlay({
    overlays:[
        Widget.Icon({
            vexpand:true, 
            hexpand:true,
            hpack: 'center', 
            // vpack: 'center',
            // justification: 'center',
            // label: "Weather"
            visible: true,
            css: 'font-size: 70px; color: green; opacity: 0.5;',
            icon: forcast_icon.bind()//'windy-strong-svgrepo-com'
        }),Widget.Label({
            vexpand:true, 
            hexpand:true,
            hpack: 'center', 
            vpack: 'center',
            justification: 'center',
            label: temp.bind() ,//"60"
        }),
    ]

})
// children: [
//     Widget.Label({
//         vexpand:true, 
//         hexpand:true,
//         hpack: 'center', 
//         vpack: 'center',
//         justification: 'center',
//         label: "Weather"
//     }),

// ]

})