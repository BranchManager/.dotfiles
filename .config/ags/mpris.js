


export const media = () => Widget.Box({
    className: 'mpris_main_box',
    child: Widget.Overlay({
        overlays:[
            Widget.Icon({
                vexpand:true, 
                hexpand:true,
                hpack: 'center', 
            
                visible: true,
                css: 'font-size: 70px; color: green; opacity: 0.5;',
                icon: 'nothere'//'windy-strong-svgrepo-com'
            }),Widget.Label({
                vexpand:true, 
                hexpand:true,
                hpack: 'center', 
                vpack: 'center',
                css: 'font-size: 12px;',
                wrap: true,
                justification: 'center',
                label: "is is most likely caused by not destroying a Clutter actor or Gtk+ widget with ::destroy signals connected, but can also be caused by using the destroy(), dispose(), or remove() vfuncs. Because it would crash the application, it has been blocked and the JS callback not invoked." ,//"60"
            }),
        ]

    })
})

// const mpris = await Service.import("mpris")
// const players = mpris.bind("players")

// const FALLBACK_ICON = "audio-x-generic-symbolic"
// const PLAY_ICON = "media-playback-start-symbolic"
// const PAUSE_ICON = "media-playback-pause-symbolic"
// const PREV_ICON = "media-skip-backward-symbolic"
// const NEXT_ICON = "media-skip-forward-symbolic"

// /** @param {number} length */
// function lengthStr(length) {
//     const min = Math.floor(length / 60)
//     const sec = Math.floor(length % 60)
//     const sec0 = sec < 10 ? "0" : ""
//     return `${min}:${sec0}${sec}`
// }

// /** @param {import('types/service/mpris').MprisPlayer} player */
// function Player(player) {
//     const img = Widget.Box({
//         class_name: "img",
//         vpack: "start",
//         css: player.bind("cover_path").transform(p => `
//             background-image: url('${p}');
//         `),
//     })

//     const title = Widget.Label({
//         class_name: "title",
//         wrap: true,
//         hpack: "start",
//         label: player.bind("track_title"),
//     })

//     const artist = Widget.Label({
//         class_name: "artist",
//         wrap: true,
//         hpack: "start",
//         label: player.bind("track_artists").transform(a => a.join(", ")),
//     })

//     const positionSlider = Widget.Slider({
//         class_name: "position",
//         draw_value: false,
//         on_change: ({ value }) => player.position = value * player.length,
//         setup: self => {
//             const update = () => {
//                 self.visible = player.length > 0
//                 self.value = player.position / player.length
//             }
//             self.hook(player, update)
//             self.hook(player, update, "position")
//             self.poll(1000, update)
//         },
//     })

//     const positionLabel = Widget.Label({
//         class_name: "position",
//         hpack: "start",
//         setup: self => {
//             const update = (_, time) => {
//                 self.label = lengthStr(time || player.position)
//                 self.visible = player.length > 0
//             }

//             self.hook(player, update, "position")
//             self.poll(1000, update)
//         },
//     })

//     const lengthLabel = Widget.Label({
//         class_name: "length",
//         hpack: "end",
//         visible: player.bind("length").transform(l => l > 0),
//         label: player.bind("length").transform(lengthStr),
//     })

//     const icon = Widget.Icon({
//         class_name: "icon",
//         hexpand: true,
//         hpack: "end",
//         vpack: "start",
//         tooltip_text: player.identity || "",
//         icon: player.bind("entry").transform(entry => {
//             const name = `${entry}-symbolic`
//             return Utils.lookUpIcon(name) ? name : FALLBACK_ICON
//         }),
//     })

//     const playPause = Widget.Button({
//         class_name: "play-pause",
//         on_clicked: () => player.playPause(),
//         visible: player.bind("can_play"),
//         child: Widget.Icon({
//             icon: player.bind("play_back_status").transform(s => {
//                 switch (s) {
//                     case "Playing": return PAUSE_ICON
//                     case "Paused":
//                     case "Stopped": return PLAY_ICON
//                 }
//             }),
//         }),
//     })

//     const prev = Widget.Button({
//         on_clicked: () => player.previous(),
//         visible: player.bind("can_go_prev"),
//         child: Widget.Icon(PREV_ICON),
//     })

//     const next = Widget.Button({
//         on_clicked: () => player.next(),
//         visible: player.bind("can_go_next"),
//         child: Widget.Icon(NEXT_ICON),
//     })

//     return Widget.Box(
//         { class_name: "player" },
//         img,
//         Widget.Box(
//             {
//                 vertical: true,
//                 hexpand: true,
//             },
//             Widget.Box([
//                 title,
//                 icon,
//             ]),
//             artist,
//             Widget.Box({ vexpand: true }),
//             positionSlider,
//             Widget.CenterBox({
//                 start_widget: positionLabel,
//                 center_widget: Widget.Box([
//                     prev,
//                     playPause,
//                     next,
//                 ]),
//                 end_widget: lengthLabel,
//             }),
//         ),
//     )
// }

// export function media() {
//     return Widget.Box({
//         vertical: true,
//         css: "min-height: 2px; min-width: 2px;", // small hack to make it visible
//         visible: players.as(p => p.length > 0),
//         children: players.as(p => p.map(Player)),
//     })
// }