const systemtray = await Service.import('systemtray')

/** @param {import('types/service/systemtray').TrayItem} item */
const SysTrayItem = item => Widget.Button({
    className: 'tray_icon',
    child: Widget.Icon().bind('icon', item, 'icon'),
    tooltipMarkup: item.bind('tooltip_markup'),
    onPrimaryClick: (_, event) => item.activate(event),
    onSecondaryClick: (_, event) => item.openMenu(event),
});

export const sysTray = Widget.Box({
    children: systemtray.bind('items').as(i =>{ i.map(SysTrayItem); console.log("The TRAY");console.log(i);})
})