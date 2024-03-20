import BluelightFilterService from './bluelight_filter_service.js'

var blue_light_filter_off = 'frappe-crust-moon'
var blue_light_filter_on = 'machiato_yellow_moon'


function check_filter(){
    //whats_running = Utils.exec('ps -x | grep -c wlsunset')
    if (BluelightFilterService.running == "on"){
        console.log("filter running")
        return blue_light_filter_on
 
    }else{
        console.log("filter not running")
        return blue_light_filter_off
    }
}

check_filter()
export const bluelightfilter_button = () => Widget.Button({
    className: 'quick_setting_button_box',
    onClicked: () => BluelightFilterService.toggle(),
    child: Widget.Label({

        label:  Utils.watch(check_filter(), BluelightFilterService, () => { 
                    if(BluelightFilterService.running ==  "on")
                        return bluetooth_icon_on
                    if(!BluelightFilterService.running == "off")
                        return bluetooth_icon_off
                    // Not sure of lthis return statement will ever return, maybe if the machine does not have bluetooth
                    return bluetooth_icon_off
                })
        
            })
        
        
        
        
        
        //BluelightFilterService.bind('screen-changed')
  
    
    // Widget.Icon({
    //     className: 'bluetooth_button_icon_nobt',
    //    size: 90,

    //    // This wathces the state of bluetooth and changes the icon accordingly
    //    icon: BluelightFilterService.bind('screen-changed')
       
    // //    Utils.watch(check_filter(), BluelightFilterService, () => { 
    // //         if(BluelightFilterService.running ==  "on")
    // //             return bluetooth_icon_on
    // //         if(!BluelightFilterService.running == "off")
    // //             return bluetooth_icon_off
    // //         // Not sure of lthis return statement will ever return, maybe if the machine does not have bluetooth
    // //         return bluetooth_icon_off
    // //     })

    // })
    
 })