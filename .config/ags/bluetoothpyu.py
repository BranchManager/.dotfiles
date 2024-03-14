import pexpect
import time

def send_command_to_bluetoothctl():
    child = pexpect.spawn('bluetoothctl')
    child.sendline('scan on')  # Start scanning for devices

    # Continuously get output
    while True:
        try:
            child.expect('\n', timeout=30)  # Wait for a new line
            print(child.before.decode())  # Print the output
        except pexpect.TIMEOUT:
            break  # If no new output for 5 seconds, stop getting output

    child.sendline('scan off')  # Stop scanning for devices
    child.sendline('exit')  # Exit bluetoothctl

send_command_to_bluetoothctl()