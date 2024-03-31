const mpris = await Service.import("mpris")
const players = mpris.bind("players")

const FALLBACK_ICON = "audio-x-generic-symbolic"
const PLAY_ICON = "media-playback-start-symbolic"
const PAUSE_ICON = "media-playback-pause-symbolic"
const PREV_ICON = "media-skip-backward-symbolic"
const NEXT_ICON = "media-skip-forward-symbolic"

/** @param {number} length */
function lengthStr(length) {
    const min = Math.floor(length / 60)
    const sec = Math.floor(length % 60)
    const sec0 = sec < 10 ? "0" : ""
    return `${min}:${sec0}${sec}`
}

/** @param {import('types/service/mpris').MprisPlayer} player */
function Player(player) {
    

    const img = Widget.Box({
        class_name: "mpris_img",
        vpack: "start",
        css: player.bind("cover_path").transform(p => `
            background-image: url('${p}');
        `),
    })

    const title = Widget.Label({
        class_name: "title",
        //wrap: true,
        truncate: 'end',
        maxWidthChars: 40,
        hpack: "start",
        label: player.bind("track_title"),
    })

    const artist = Widget.Label({
        class_name: "artist",
        wrap: true,
        hpack: "start",
        label: player.bind("track_artists").transform(a => a.join(", ")),
    })

    const positionSlider = Widget.Slider({
        class_name: "position",
        draw_value: false,
        on_change: ({ value }) => player.position = value * player.length,
        setup: self => {
            const update = () => {
                self.visible = player.length > 0
                self.value = player.position / player.length
            }
            self.hook(player, update)
            self.hook(player, update, "position")
            self.poll(1000, update)
        },
    })

    const positionLabel = Widget.Label({
        class_name: "position",
        hpack: "start",
        setup: self => {
            const update = (_, time) => {
                self.label = lengthStr(time || player.position)
                self.visible = player.length > 0
            }

            self.hook(player, update, "position")
            self.poll(1000, update)
        },
    })

    const lengthLabel = Widget.Label({
        class_name: "length",
        hpack: "end",
        visible: player.bind("length").transform(l => l > 0),
        label: player.bind("length").transform(lengthStr),
    })

    const icon = Widget.Icon({ //TODO: ADD CORRECT ICONS
        //class_name: "icon",
        margin: 5,
        hexpand: true,
        vexpand: true,
        hpack: "end",
        vpack: "start",
        size: 25,
        tooltip_text: player.identity || "",
        icon: player.bind("entry").transform(entry => {
            const name = `${entry}-symbolic`
            console.log(name)
            console.log("NAME**************")
            return Utils.lookUpIcon(name) ? name : FALLBACK_ICON
        }),
    })

    const playPause = Widget.Button({
        class_name: "play-pause",
        on_clicked: () => player.playPause(),
        visible: player.bind("can_play"),
        child: Widget.Icon({
            size: 25,
            icon: player.bind("play_back_status").transform(s => {
                switch (s) {
                    case "Playing": return PAUSE_ICON
                    case "Paused":
                    case "Stopped": return PLAY_ICON
                }
            }),
        }),
    })

    const loop = Widget.Button({
        class_name: "shuffle",
        on_clicked: () => player.loop(),
        visible: Utils.watch(player.loopStatus != null, player,() =>{
            if (player.loopStatus != null){
                return true
            }else{
                return false
            }
        }),//player.bind("shuffle_status"),
        child: Widget.Icon({
            class_name: Utils.watch(player.loopStatus == "Track"?"loop-track" : player.loopStatus == "Playlist" ? "loop-playlist-album":"", player, () => {
                print("loop status n shit")
                print(player.loopStatus)
                var classname
                //var classname = player.loopStatus ? "":"None" ? "loop-track":"Track" ? "loop-playlist-album":"Playlist"
                if(player.loopStatus == "None"){
                    classname = ""
                }else if(player.loopStatus == "Track"){
                    classname = "loop-track"
                }else{
                    classname = "loop-playlist-album"
                }
                print(classname)
                return classname
            }),
            icon: "media-playlist-repeat-symbolic"
        }),
    })

    const shuffle = Widget.Button({
        class_name: "shuffle",
        on_clicked: () => player.shuffle(),
        visible: Utils.watch(player.shuffleStatus != null, player,() =>{
            if (player.shuffle_status != null){
                return true
            }else{
                return false
            }
        }),//player.bind("shuffle_status"),
        child: Widget.Icon({
            class_name: Utils.watch(player.shuffleStatus ? "shuffle-enabled" : "", player, () => {
                if (player.shuffleStatus == true)
                    return "shuffle-enabled"
                else{
                    return ""
                }
            }),
            icon: "media-playlist-shuffle-symbolic"
        }),
    })


    const prev = Widget.Button({
        on_clicked: () => player.previous(),
        css: "padding-left: 5px;",
        visible: player.bind("can_go_prev"),
        child: Widget.Icon({
            icon:PREV_ICON,
            size:20,
        }),
    })

    const next = Widget.Button({
        on_clicked: () => player.next(),
        css: "padding-right: 5px;",
        visible: player.bind("can_go_next"),
        child: Widget.Icon({
            size:20,
            icon:NEXT_ICON
        }),
    })

    const volume = Widget.Slider({
        class_name: "player_volume_slider",
        draw_value: false,
        inverted: true,
        vertical: true,
        on_change: ({ value }) => player.volume = value,
        visible: player.volume >= 0,//players.as(p => p.volume >= 0),
        value: player.bind("volume"),
        setup: self => {
            const update = () => {
                self.visible = player.volume >= 0
            }
            console.log("volume")
            console.log(player.volume)
            console.log(player.name)
            self.hook(player, update)
            //self.poll(1000, update)
        },
    })

    return Widget.Box({
    
        children: [
            Widget.Box(
                { class_name: "player",
                    vertical: false,
                    css: player.bind("cover_path").transform(p => `
                        background-image: url('${p}');
                    `),
                },
                //img,
                Widget.Box(
                    {
                        className: "player_tint",
                        vertical: true,
                        hexpand: true,
                        vexpand: true,
                    },
                    Widget.Box({
                        vertical: false,

                        children: [Widget.Box({
                            vertical:true,
                            
                            children:[
                                title,
                                //icon,
                                artist,
                            ]
                        }),
                        icon,
                        
                        ]
                    }),
                //     artist,
                    Widget.Box({ vexpand: true }),
                    positionSlider,
                    Widget.CenterBox({
                        start_widget: positionLabel,
                        center_widget: Widget.Box([
                            loop,
                            prev,
                            playPause,
                            next,
                            shuffle,
                        ]),
                        end_widget: lengthLabel,
                    }),
                )
            ),Widget.Box({
                //visible: false,//player.volume >= 0,
                vertical:true,
                className: player.volume >= 0 ? "media_volume_box":"", //if we can interact with the volume slider, we want to show the box
                child: volume,
                //visible: players.as(p => p.volume >= 0),
                setup: self => {
                    
                    console.log("volume2")
                    console.log(player.volume)
                    console.log(player.name)
                    //self.hook(player, update)
                    //self.poll(1000, update)
                },
            })
        ]
    })
}

export function media() {
    return Widget.Box({
        vertical: true,
        css: "min-height: 2px; min-width: 2px;", // small hack to make it visible
        visible: players.as(p => p.length > 0),
        children: players.as(p => p.map(Player)),
    })
}