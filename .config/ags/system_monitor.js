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
    console.log("The cpu temp is")
    console.log(cpu_temp)
    return parseInt(cpu_temp) / cpu_temp_threshold
   


}

const cpu_temp = Variable(0, {
    poll: [2000,get_cpu_temp],
})

/******df -h */
get_cpu_temp()
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

export default function(){
    const system_monitors = Widget.Box({
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

    return system_monitors
}