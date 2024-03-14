const GLib = imports.gi.GLib;
const divide = ([total, free]) => free / total
const cpu_temp_threshold = 85

/**************************************Get cpu usage********************** */
// only works for amd cpu with minimal sensors deteected
const cpu = Variable(0, {
    poll: [2000, 'top -b -n 1', out => divide([100, out.split('\n')
        .find(line => line.includes('Cpu(s)'))
        .split(/\s+/)[1]
        .replace(',', '.')])],
})
/**************************************Get ram usage********************** */
const ram = Variable(0, {
    poll: [2000, 'free', out => divide(out.split('\n')
        .find(line => line.includes('Mem:'))
        .split(/\s+/)
        .splice(1, 2))],
})

function get_cpu_temp(){
    var cpu_temp = Utils.exec('sensors').split('\n')
        .find(line => line.includes('Tccd1'))
        .split(/\s+/)[1]
        .match(/\d+/)[0];
 
    return parseInt(cpu_temp) / cpu_temp_threshold
   


}

const cpu_temp = Variable(0, {
    poll: [2000,get_cpu_temp],
})


//drive_space()
//get_cpu_temp()
/*************************repeatedly call amdtop and get the average of the Edgen Junction and memory temp on the gpu*/
// dependency required: amdgpu_top
function get_gpu_temp(){
 var edge = Utils.exec('amdgpu_top -d').split('\n')
    .find(line => line.includes('Edge Temp'))
    .split(/\s+/)[3]
var Junction = Utils.exec('amdgpu_top -d').split('\n')
    .find(line => line.includes('Junction Temp'))
    .split(/\s+/)[3]
var Memory = Utils.exec('amdgpu_top -d').split('\n')
    .find(line => line.includes('Memory Temp'))
    .split(/\s+/)[3]

    var addedTemp = parseInt(edge) + parseInt(Junction) + parseInt(Memory)
    var avgTemp = addedTemp / 3
    
 var gpu_tmep = avgTemp/110;
 return gpu_tmep
}

const gpu = Variable(0, {
    poll: [2000,get_gpu_temp],
})
/**************************************Get drive space********************** */
// returns the two biggest drives moounted on the system
//may need to eventually take into account flash drives
const drive_space = () => {

    let devices = {}
    let device_keys = []
    //get each line of mounted drives
    var df = Utils.exec('df -h').split('\n')
    //only get the lines with dev in them
    var dev_lines = df.filter(line => line.includes('dev'))
    //remove the lines with loop in them
    var dev_wo_loop = dev_lines.filter(line => !line.includes('loop'))
    //iterate through the lines and get the drive info
    for (var i = 0; i < dev_wo_loop.length; i++){
        //This will grab the device name ie where it is mounted and the size
        var device_info = dev_wo_loop[i].split(/\s+/)
        var size = device_info[1]
        
        //make sure that the drive is an actual drive and not a flash drive or something else
        if (parseFloat(size.match(/\d+/)) > 100 && size.includes('G')){
            //get the device name without the dev/ part
            var device = device_info[0].split('/').slice(-1)
            //make sure that the device is not already in the list
            if (!device_keys.includes(device)){
                var used = device_info[2]
                var available = device_info[3]
                var used_percentages = device_info[4]
                device_keys.push(device)
                var new_device = {'device': device, 'size': size, 'used': used, 
                'available': available, 'used_percentages': used_percentages}   

            
                devices[device] = new_device
            }

        }

   
    }

    return devices

}
// This fucntion just dynamically creates the widgets for the drive space
function make_drive_space_widgets(){
   var devices = drive_space()
    var device_widgets = []

    for (var i = 0; i < Object.keys(devices).length; i++){
        if (i < 2){
            var key = Object.keys(devices)[i];
 
            device_widgets.push(Widget.Box({
                vertical: false,
                spacing: 10,
                children: [
                
                    Widget.Icon({
                        size: 120,
                        className: 'system_harddrive_icon',
                        icon: '/home/branchmanager/.config/ags/assets/latte-lavender-harddrive.svg',
                    }),
                    
                    Widget.Box({
                        vertical: true,
                        css: 'margin-right: -10px; margin-left: -40px;',
                        children: [Widget.Label({xalign: 0, maxWidthChars:14, label:"Dev:" + devices[key].device}),
                        Widget.Separator({css:'font-size: 50px', orientation: 1}),
                        Widget.Label({ className: 'harddrive_labels', xalign: 0, label: "Used: " + devices[key].used}),
                        Widget.Label({xalign:0, justification: 'left', label: "Avail: " + devices[key].available}),]

                    }),Widget.CircularProgress({
                        rounded: true,
                        startAt: 0.75,
                        className: 'harddrive_circular_progress',
                        value: devices[key].used_percentages.replace('%','') / 100,
                    }),


                ]

            }))
        }
    }   

    return device_widgets
}

make_drive_space_widgets()
/***************************************Widget boxes below****************************8 */
const cpu_monitor = () => Widget.Box({

    //css: 'background-color: red;',
    spacing: 0,
    vertical: false,
    children: [

            Widget.Icon({
            vpack: 'center',
            hexpand: false,
            visible: true,
            size: 20,
            classNames:['system_bar_icon_cpu'],
            css: 'margin-top: -10px; ',
            icon: '/home/branchmanager/.config/ags/assets/noun-cpu-72043.svg',

        }),
        Widget.ProgressBar({
            vpack: 'start',
            classNames: ['my_slider','my_slider_cpu'],

            value: cpu.bind(),
        }),
    

    ]
})

const ram_monitor = () => Widget.Box({

    spacing: 0,
    vertical: false,
    children: [

            Widget.Icon({
            vpack: 'center',
            hexpand: false,
            visible: true,
            size: 30,
            classNames:['system_bar_icon_ram'],
            css: 'margin-top: -10px; ',
            icon: '/home/branchmanager/.config/ags/assets/Frappe_teal_ram.svg',

        }),
        Widget.ProgressBar({
            vpack: 'start',
            classNames: ['my_slider','my_slider_ram'],
            value: ram.bind(),
        }),
    

    ]
})

const cpu_temp_monitor = () => Widget.Box({

    spacing: 0,
    vertical: false,
    children: [

            Widget.Icon({
            vpack: 'center',
            hexpand: false,
            visible: true,
            size: 35,
            classNames:['system_bar_icon_cpu_temp'],
            css: 'margin-top: -10px; ',
            icon: '/home/branchmanager/.config/ags/assets/Latte_saphire_thermometer.svg',

        }),
        Widget.ProgressBar({
            vpack: 'start',
            classNames: ['my_slider','my_slider_cpu_temp'],
            value: cpu_temp.bind(),
        }),
    

    ]
})

const gpu_monitor = () => Widget.Box({

    //css: 'background-color: red;',
    spacing: 0,
    vertical: false,
    children: [

            Widget.Icon({
            vpack: 'center',
            hexpand: false,
            visible: true,
            size: 25,
            className: 'system_bar_icon_gpu',
            css: 'margin-top: -5px; ',
            icon: '/home/branchmanager/.config/ags/assets/macchiato_blue_gpu.svg',

        }),
        Widget.ProgressBar({
            vpack: 'start',
            classNames: ['my_slider','my_slider_gpu'],
            value: gpu.bind(),
        }),
    

    ]
})
export function drive_monitor(){
    
    const drive_monitors = Widget.Box({
        //css: 'min-width: 1px; min-height: 50px; border-radius: 10px;',
        vertical: false,
        vpack: 'start',
        className: 'system_monitor_harddrive_box',
        spacing: 10,
        children:make_drive_space_widgets()

    })

    return drive_monitors

}

export function system_monitors(){
    const system_monitor = Widget.Box({
        //css: 'min-width: 1px; min-height: 50px; border-radius: 10px;',
        vertical: true,
        vpack: 'start',
        className: 'system_monitor_bar_box',
        spacing: 10,
        children:[ cpu_monitor(),
        ram_monitor(),
        cpu_temp_monitor(),
        gpu_monitor(),]

    })

    return system_monitor
}