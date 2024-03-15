const bluetooth = await Service.import('bluetooth')
const GLib = imports.gi.GLib;
const Mainloop = imports.mainloop;
const bluetooth_icon_on = '/home/branchmanager/.config/ags/assets/lattet-blue-bluetooth.svg'
const bluetooth_icon_off = '/home/branchmanager/.config/ags/assets/frappe-crust-no-bluetooth.svg'

var quicksettings_reveal = false;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, s));
}

async function demo() {
    console.log('Hello');
    await sleep(10000);
    console.log('World');
}

function check_blue(){
    //bluetooth.enabled = false
    //Utils.exec("systemctl status bluetooth")
    var enables = '';
    var enabled = false;
    //GLib.timeout_add(GLib.PRIORITY_DEFAULT, 100, (enables) => {
   //bluetooth.toggle()
        console.log("bluetooth enabled")
        console.log(bluetooth.enabled)
        if(bluetooth.enabled){
            
            console.log('bluetooth true')
            enables = 'bluetooth'
            //
            enables = bluetooth_icon_on
            enabled = true;
            //Mainloop.quit();
            
        }else{
            //Mainloop.quit();
            console.log('bluetooth false')
            enables = 'bluetooth_disabled'
            //Mainloop.quit();
            enables = bluetooth_icon_off
            enabled = false;
           // Mainloop.quit();
        }
        //Mainloop.quit();
    
   //});
    //Mainloop.run();

    return [enables, enabled]
}

// check_blue()
// check_blue()
function reveal_func(){
    quicksettings_reveal = false;
    console.log('reveal_func');
    if (bluetooth_revealer.revealChild) {
        bluetooth_revealer.revealChild = false;
        console.log('revealChild set to false');
        console.log(bluetooth_revealer.revealChild)
    } else {
       bluetooth_revealer.revealChild = true;
        console.log('revealChild set to true');
        console.log(bluetooth_revealer.revealChild)
    }
}

const header = Widget.Label({className: 'bluetooth_device_header', label: 'Bluetooth',})
export var bluetooth_revealer = 
    
    Widget.Revealer({
    revealChild: false, //self.revealChild,
    child: Widget.Box({
        vertical: true,
        children: [Widget.Box({
           //className: 'quicksettingstest',
           hpack: 'end',
            vertical: false,
            child: Widget.Switch({
                hpack: 'end',
                active: check_blue()[1],
                className: 'bluetooth_toggle_slider',
                onActivate: () =>{bluetooth.toggle()},
            })

        }),
        Widget.Box({
            vertical: true,
            className: 'bluetooth_devices_box',
            children: [header,]
        }),]
        
    })
        
})



let name = 'bluetoot'
export const bluetooth_button = () => Widget.Button({
    className: 'quick_setting_button_box',
    //spacing: 10,
    onClicked: () => reveal_func(),//= !quicksettings_reveal,
    child: Widget.Icon({
       //"#414559" no bt
        className: 'bluetooth_button_icon_nobt',
       size: 90,
       //icon: '/home/branchmanager/.config/ags/assets/frappe-crust-no-bluetooth.svg',
       //icon: '/home/branchmanager/.config/ags/assets/lattet-blue-bluetooth.svg',
       icon: Utils.watch(check_blue()[0], bluetooth, () => { 
            if(bluetooth.enabled)
                //console.log('bluetooth enabled')
                return bluetooth_icon_on
            if(!bluetooth.enabled)
                //console.log('bluetooth disabled')
                return bluetooth_icon_off
            
            return '/home/branchmanager/.config/ags/assets/latte-lavender-harddrive.svg'
            })
       //bluetooth.bind('enabled').as(on =>`/home/branchmanager/.config/ags/assets/${on ? 'lattet-blue-bluetooth.svg' : 'frappe-crust-no-bluetooth.svg'}`),
        //label: 'bluetooth',
    })
    
//     child: Widget.Label({ label: bluetooth.bind('enabled').as(on =>
//         `bluetooth-${on ? 'active' : 'disabled'}-symbolic`)}),
     
//     onClicked: () => console.log('bluetooth button clicked'),
 })

export function bluetooth_box(){

        return Widget.Box({
        vertical: false,
        spacing: 0,
        children: [
            Widget.Label({
                label: name,
                setup: self => self.hook(bluetooth, self => {
                    //self.children = bluetooth.connected_devices
                    //self.label(String(bluetooth.devices.length))
                    self.label = String(bluetooth.devices.length),
                    console.log("The bluetooth devices first")
                    console.log(typeof String(bluetooth.devices.length))
                        // .map(({ icon_name, name }) => Widget.Box([
                        //     Widget.Icon(icon_name + '-symbolic'),
                        //     Widget.Label(name),
                        // ]));
                    // name = String(bluetooth.devices.length);
                    console.log("The bluetooth devices")
                    console.log(bluetooth.devices)
                    console.log(bluetooth.connectedDevices)
                    //self.visible = bluetooth.devices.length > 0;
                }, 'notify::connected-devices'),
                    //(output) => self.label = output)},
            }),
        ]
    })


    // return Widget.Box({
    //     setup: self => self.hook(bluetooth, self => {
    //         self.children = bluetooth.connected_devices
    //             .map(({ icon_name, name }) => Widget.Box([
    //                 Widget.Icon(icon_name + '-symbolic'),
    //                 Widget.Label(name),
    //             ]));
    
    //         self.visible = bluetooth.connected_devices.length > 0;
    //     }, 'notify::connected-devices'),
    // })
}

