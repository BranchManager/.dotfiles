const bluetooth = await Service.import('bluetooth')
const GLib = imports.gi.GLib;
const Mainloop = imports.mainloop;
const bluetooth_icon_on = '/home/branchmanager/.config/ags/assets/lattet-blue-bluetooth.svg'
const bluetooth_icon_off = '/home/branchmanager/.config/ags/assets/frappe-crust-no-bluetooth.svg'

export var quicksettings_reveal = true;

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
    GLib.timeout_add(GLib.PRIORITY_DEFAULT, 100, (enables) => {
   //bluetooth.toggle()
        console.log("bluetooth enabled")
        console.log(bluetooth.enabled)
        if(bluetooth.enabled){
            
            console.log('bluetooth true')
            enables = 'bluetooth'
            //Mainloop.quit();
            
        }else{
            //Mainloop.quit();
            console.log('bluetooth false')
            enables = 'bluetooth_disabled'
            //Mainloop.quit();
        }
        Mainloop.quit();
    
    });
    Mainloop.run();

    return enables
}

// check_blue()
// check_blue()
function reveal_func(){
    quicksettings_reveal = false;
    console.log('reveal function')
}
let name = 'bluetoot'
export const bluetooth_button = () => Widget.Button({
    className: 'quick_setting_button_box',
    //spacing: 10,
    onClicked: () => reveal_func(),
    child: Widget.Icon({
       //"#414559" no bt
        className: 'bluetooth_button_icon_nobt',
       size: 90,
       //icon: '/home/branchmanager/.config/ags/assets/frappe-crust-no-bluetooth.svg',
       icon: '/home/branchmanager/.config/ags/assets/lattet-blue-bluetooth.svg',
       icon: Utils.watch(bluetooth_icon_off, bluetooth, () => { 
            if(bluetooth.enabled)
                return bluetooth_icon_on
            if(!bluetooth.enabled)
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
    // return Widget.Box({
    //     vertical: false,
    //     spacing: 0,
    //     children: [
    //         Widget.Label({
    //             label:'bluetooth',
    //             setup: (self) => {Utils.execAsync(['python3','/home/branchmanager/.config/ags/bluetoothpyu.py'])
    //             .then((output) => self.label = output)},
    //                 //,
    //                 //(output) => self.label = output)},
    //         }),
    //     ]
    // })



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

