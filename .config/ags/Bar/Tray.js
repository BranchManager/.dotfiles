const systemtray = await Service.import('systemtray')
import Gdk from "gi://Gdk"

//@param {import('types/service/systemtray').TrayItem} item
const SysTrayItem = item => Widget.Button({
    class_name: "tray_icon",
    child: Widget.Icon({ size: 25,icon: item.bind("icon") }),
    tooltip_markup: item.bind("tooltip_markup"),
    setup: self => {
        const menu = item.menu
        if (!menu)
            return

        console.log("THE MENU IS: ")
        console.log(item.title)
        console.log(item.icon)
        const id = item.menu?.connect("popped-up", () => {
            menu.className = "active_menu"
            self.toggleClassName("active_menu")
            menu.connect("notify::visible", () => {
                self.toggleClassName("active_menu", menu.visible)
            })
            menu.disconnect(id)
        })

        if (id)
            self.connect("destroy", () => item.menu?.disconnect(id))
    },

    on_primary_click: btn => item.menu?.popup_at_widget(
        btn, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null),

    on_secondary_click: btn => item.menu?.popup_at_widget(
        btn, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null),
});

export const sysTray = () => Widget.Box({
    className: "traybox",
    children: systemtray.bind('items').as(i =>i.map(SysTrayItem))
})