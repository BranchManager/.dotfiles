
import Notification_maker from "./notificationPopups.js"
//import Notification from "./Notification"
// import options from "options"

const notifications = await Service.import("notifications")
// const { transition } = options
// const { position } = options.notifications
const { timeout, idle } = Utils

//This only thing I know about this function is that it handles the animation of the notifications
//This code was stolen from aylurs dots
function Animated(id) {
    const n = notifications.getNotification(id)
    const widget = Notification_maker(n)

    const inner = Widget.Revealer({
        transition: "slide_left",
        transition_duration: 500,
        child: widget,
    })

    const outer = Widget.Revealer({
        transition: "slide_down",
        transition_duration: 500,
        child: inner,
    })

    const box = Widget.Box({
        hpack: "end",
        child: outer,
    })

    idle(() => {
        outer.reveal_child = true
        timeout(500, () => {
            inner.reveal_child = true
        })
    })

    return Object.assign(box, {
        dismiss() {
            inner.reveal_child = false
            timeout(500, () => {
                outer.reveal_child = false
                timeout(500, () => {
                    box.destroy()
                })
            })
        },
    })
}

function PopupList() {
    //const map: Map<number, ReturnType<typeof Animated>> = new Map
    const map = new Map()
    const box = Widget.Box({
        hpack: "end",
        vertical: true,
        css: 'min-width: 440px' //options.notifications.width.bind().as(w => `min-width: ${w}px;`),
    })

    function remove(_, id) {
        map.get(id)?.dismiss()
        map.delete(id)
    }

    return box
        .hook(notifications, (_, id) => {
            if (id !== undefined) {
                if (map.has(id))
                    remove(null, id)

                if (notifications.dnd)
                    return

                const w = Animated(id)
                map.set(id, w)
                box.children = [w, ...box.children]
            }
        }, "notified")
        .hook(notifications, remove, "dismissed")
        .hook(notifications, remove, "closed")
}

export default (monitor) => Widget.Window({
    monitor,
    name: `notifications${monitor}`,
    anchor: ['top','right'], //position.bind(),
    class_name: "notifications",
    child: Widget.Box({
        css: "padding: 2px;",
        child: PopupList(),
    }),
})