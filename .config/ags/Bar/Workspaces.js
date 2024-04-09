const hyprland = await Service.import('hyprland')

export function create_workspace_indicator(monitor) {
  

    const WorkspaceIndicator = Widget.EventBox({
      onScrollUp: () => dispatch('+1'),
      onScrollDown: () => dispatch('-1'),
      hexpand: false,
      hpack: 'start',
      
      child: Widget.Box({
        hexpand: false,
        vexpand: false,
        hpack: 'start',
        className: 'workspace_box',
          children: Array.from({ length: 10 }, (_, i) => i).map(i => Widget.Button({
           //className: 'occupied',
              attribute: i,
              label: `${i}`,
              onClicked: () => hyprland.message(`dispatch workspace ${i}`),

              
          }).hook(hyprland.active.workspace, (self) =>{
              self.toggleClassName('active', hyprland.active.workspace.id === i)
              self.toggleClassName("unactive", hyprland.active.workspace.id != i)}
          )),
  
          // remove this setup hook if you want fixed number of buttons
          setup: self => self.hook(hyprland, () => self.children.forEach(btn => {
              //btn.visible = hyprland.workspaces.some(ws => ws.id === btn.attribute); //keep this line 
              //console.log("MONITOR")
              //console.log(hyprland.workspaces)
              btn.visible = hyprland.workspaces.some(mon => (mon.monitorID == monitor && mon.id === btn.attribute ));
              
              //hyprland.workspaces.some(mon => {print("MONITOPR2");console.log(mon.monitorID);print("AM I RIGHT"); console.log(monitor);})
          })),
      })
    })
  
    return Widget.Box({
      className: 'center',
      vpack: 'center',
      vertical: true,
      children: [
        WorkspaceIndicator
      ]
    })
}