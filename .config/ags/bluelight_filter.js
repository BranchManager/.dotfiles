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
    child: Widget.Icon({
        size: 50,
        className: 'blue_light_filter_box',
        css: 'color: black;',
        icon:  BluelightFilterService.bind('icon')
    })
        
        
 })