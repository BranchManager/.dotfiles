
const Hours = Variable('',{
    poll: [60000, 'date +%H']
})

const mins = Variable('',{
    poll: [60000, 'date +%M']
})

export const Calender_and_clock = () => Widget.Box({
    
    children:[
        
        Widget.Box({
            hexpand: false,
            className: 'calendar_main_box',
            child:Widget.Calendar({
                hexpand: true,
                className: 'calendar',
                showDayNames: true,
                showDetails: true,
                showHeading: true,
     
         }),
    }),

    Widget.Box({
        hexpand: false,
        vertical: true,
        children: [
            Widget.Label({
                xalign: 0,
                className: 'hours_clock_label',
                label: Hours.bind() ,
            }),
            Widget.Label({
                className: 'hours_clock_label',
                justification: 'left',
                xalign: 0,
                label: mins.bind(),
            }),
        ]
    }),
    ]

})