var blue_light_filter_off = '/home/noah/.config/ags/assets/frappe-crust-moon.svg'
var blue_light_filter_on = '/home/noah/.config/ags/assets/machiato_yellow_moon.svg'
function check_filter(){
    whats_running = Utils.exec('ps -x | grep -c wlsunset')
    if (parseInt(whats_running) > 1){
        return blue_light_filter_on
    }else{
        return blue_light_filter_off
    }
}
export const bluelightfilter_button = () => Widget.Button({
    className: 'quick_setting_button_box',
    onClicked: () => bluetooth_reveal_func(false),
    child: Widget.Icon({
        className: 'bluetooth_button_icon_nobt',
       size: 90,

       // This wathces the state of bluetooth and changes the icon accordingly
       icon: Utils.watch(check_blue()[0], bluetooth, () => { 
            if(bluetooth.enabled)
                return bluetooth_icon_on
            if(!bluetooth.enabled)
                return bluetooth_icon_off
            // Not sure of lthis return statement will ever return, maybe if the machine does not have bluetooth
            return bluetooth_icon_off
            })

    })
    
 })