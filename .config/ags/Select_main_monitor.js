const GLib = imports.gi.GLib;

let homeDirectory = GLib.get_home_dir();

const contents = Utils.readFile(`${homeDirectory}/.config/hypr/hyprland.conf`);

//This will run the hyprctl -j monitors command and get the monitor id
function get_monitor_id(monitor_dev){
    let id = 0;
    let hyprmonitors = Utils.exec('hyprctl -j monitors')
    JSON.parse(hyprmonitors).forEach((monitor) => {
        if(monitor.name == monitor_dev){
            
            id = monitor.id
        }
    });
    return id;
}

//This f;unction will get the main monitor from the config file
//in the config it will be denoted by "MAIN_MONITOR" on the soame line as the monitor
//ex: monitor=HDMI-A-1,3440x1440@85,2320x0,1,bitdepth,8 #MAIN_MONITOR 
export function get_main_monitor(){
    let id = 0;
    
    if(contents){
      
        let lines = contents.split("\n");
       
        lines.forEach((line) => {
          
            if(line.includes("MAIN_MONITOR")){

                let monitor_equals = line.split(",")[0]
                let monitor_dev = monitor_equals.split("=")[1]

                id = get_monitor_id(monitor_dev)
         
            }
        });
    }
    return id;
}

