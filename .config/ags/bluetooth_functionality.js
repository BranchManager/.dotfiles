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

//TODO: change the color of the devices label
const header = Widget.Label({ xalign: 0, className: 'bluetooth_device_header', label: 'Devices',})
function get_devices(mself){
    device_array = []
    device_array.push(box_header)
    for(var i = 0; i < devices.length; i++){
        if(i%2 == 0){
            //device is even so give it a certain background color
            var background_color = 'blue'
            
        }
    }
    device_array.push(Widget.Label({label: 'Devices2'}))
    var devices = bluetooth.devices
    console.log("devices**********")
    console.log(devices)
    console.log(mself.children)

    mself.children = [...device_array]
 }
const connected_status = Widget.Label({ hpack: 'end', className: 'bluetooth_device_header', label: '| Connected | connect/disconnect |',})
function connect_to_device(device){
    if (device.connected){
        device.setConnection(false)

    }else{
        device.setConnection(true)
    }
}

const box_header = Widget.Box({
    vertical: false,
    
    className: 'bluetooth_device_header',
    children: [header, ],
})
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
                //hpack: 'end',
                active: check_blue()[1],
                className: 'bluetooth_toggle_slider',
                onActivate: () =>{bluetooth.toggle()},
            })

        }),
        Widget.Box({
            vertical: true,
            //className: 'bluetooth_devices_box',
           child: box_header,
           //setup: self => self.hook(bluetooth, self => { get_devices(self) }, 'notify::devices'),
        }),
        Widget.Box({
            vertical: true,
         
            className: 'bluetooth_devices_box',
            
            //child: Widget.Label({hpack: 'end', label: 'Devices4'}),
            

            setup: self => self.hook(bluetooth, self => {

                self.children = bluetooth.devices.map(({ icon_name, name,connected },item) => Widget.Box([

                    
                    Widget.Icon({classNames:[ 'device_background_'+String(item%2),'device_icon_is_'+(item+1 == 
                        bluetooth.devices.length ? 'bottom': 'top')], icon: icon_name + '-symbolic'}),
                    
                    
                    Widget.Box({
                        tooltipText: 'click to connect',
                       //vpack: 'end',
                        vertical: false,
                        //css: 'min-height: 500px',
                       hpack: 'end',
                       className: 'device_background_'+String(item%2),
                       //css: 'min-width: 500px; background-color: red;',
                       //css: 'max-height: 3px;',
                        child: Widget.Button({
                            hpack: 'end',
                            //child: Widget.Label({ hpack: 'center', label: 'click me!'}),
                            className: 'bluetooth_device_connected_'+String(connected),
                            //child: Widget.Label('click me!'),
                            onClicked: () => connect_to_device(bluetooth.devices[item]),
                        })
                    }),
                    
                    Widget.Label({xalign: 0, maxWidthChars: 24 , classNames: ['device_background_'+String(item%2),'device_label_len','device_is_'+(item+1 == 
                        bluetooth.devices.length ? 'bottom': 'top')],label: name}),
                    //Widget.Label({classNames:['device_background_'+String(item%2),'device_label_len'], label: String(item)})
                    //Widget.Box({vpack: 'end', css: 'min-width: 30px', className: 'bluetooth_device_connected',})
               ]))
           })
        }),]
        
        //]
       
        
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



 //get_devices()
export function bluetooth_box(){

        return Widget.Box({
        vertical: false,
        spacing: 0,
        children: [
            Widget.Label({
                //label: name,
                setup: self => self.hook(bluetooth, self => {
                    //self.children = bluetooth.connected_devices
                    //self.label(String(bluetooth.devices.length))
                    //self.label = String(bluetooth.devices.length),
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

