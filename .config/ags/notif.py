import dbus

bus = dbus.SessionBus()

notif = bus.get_object('org.freedesktop.Notifications', '/org/freedesktop/Notifications')
notify = dbus.Interface(notif, 'org.freedesktop.Notifications')

actions = ['action_key', 'Action Label']
hints = {}
app_name = 'My Application'
id_num_to_replace = 0
icon = ''
summary = 'Notification Summary'
body = 'Notification Body'
expire_timeout = 5000

notify.Notify(app_name, id_num_to_replace, icon, summary, body, actions, hints, expire_timeout)