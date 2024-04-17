
var author =  Variable("Brandon Sanderson")
var quote = Variable("The purpose of a storyteller is not to tell you how to think, but to give you questions to think upon.")

export function get_quote_of_the_day(){
    Utils.execAsync(['python3', `${App.configDir}/scripts/get_quote.py`])
    .then((res) => {
       
        
        var qotd = res.split(";")
        
        quote.value = qotd[0]
        author.value = qotd[1]
    })
    .catch((err) => {console.log("ERRRRRRRRR");console.log(err)})
    return quote
}

export const quote_of_the_day = () => Widget.Button({
    className: 'quote_of_the_day_main_box',
    css: 'margin-top: 10px;',
    onClicked: () => {
        App.openWindow("tinted_background");
        App.openWindow("quote_of_the_day");
    },
   
    child: Widget.Box({
        className: 'quote_of_the_day_main_box',
       
        hexpand: false,
        vertical: true,
        children: [
            Widget.Label({
                vpack: 'start',
            
                vexpand: true,
                //justify: 'center',
                className: 'qotd',
                label: 'Quote of the day',
            }),
            Widget.Separator({
                className: "quote_separator",
                orientation: 0,
            
            }),
            Widget.Label({
                vpack: 'center',
            
                vexpand: true,
                hpack: 'center',
                hexpand: false,
                justification: 'center',
                
                wrap: true,
                
                maxWidthChars: 24,
                lines: 3,
                truncate: 'end',
                label: quote.bind(), 
            }),
            Widget.Label({
                vpack: 'end',
            
                vexpand: true,
               
                className: 'author',
                label: author.bind(), 
            }),
        ]
    }),
})


function get_quote_of_the_day_fullview(){
  
    return Widget.Box({
            className: 'qotd_fullview_outline',
            hpack: 'center',
            vpack: 'center',
        

        child: Widget.Box({
        hpack: 'center',
            vpack: 'center',
            className: 'quote_of_the_day_main_box',
            
            hpack: 'center',
            vpack: 'center',
            hexpand: true,
            vertical: true,
            children: [
                Widget.Label({
                    vpack: 'start',
                
                    vexpand: false,
                    
                    className: 'qotd',
                    label: 'Quote of the day',
                }),
                Widget.Separator({
                    className: "quote_separator",
                    orientation: 0,
                
                }),
                Widget.Label({
                    vpack: 'center',
                
                    vexpand: false,
                    hpack: 'center',
                    hexpand: false,
                    justification: 'center',
                    
                    wrap: true,
                    
                    maxWidthChars: 24,
                    lines: 3,
                    
                    label: quote.bind(), 
                }),
                Widget.Label({
                    vpack: 'end',
                
                    vexpand: false,
                    
                    className: 'author',
                    label: author.bind(), 
                }),
            ]
        }),
    })

   
}

export function quote_of_the_day_fullview(monitor=0){
    return Widget.Window({
        monitor,
        visible: false,
        keymode: 'on-demand',
        name: 'quote_of_the_day',
        layer: 'overlay',
        child: get_quote_of_the_day_fullview(),
        setup: self => self.keybind("Escape", () => {
            print("REVEALER")
            App.closeWindow("tinted_background")
            App.closeWindow("quote_of_the_day")

            
        }),


    })
  
}

