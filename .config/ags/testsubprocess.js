
function subprocess(
    cmd: string | string[],
    callback: (out: string) => void,
    onError = logError,
    bind?: Gtk.Widget,
): Gio.Subprocess

const proc = Utils.subprocess(
    // command to run, in an array just like execAsync
    ['bash', '-c', 'path-to-bash-script'],

    // callback when the program outputs something to stdout
    (output) => print(output),

    // callback on error
    (err) => logError(err),

    // optional widget parameter
    // if the widget is destroyed the subprocess is forced to quit
    widget,
)