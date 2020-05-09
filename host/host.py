import struct
import sys
import subprocess
import os
import json


def send_message(message):
    # Converts dictionary into string containing JSON format.
    msg_json = json.dumps(message, separators=(",", ":"))
    # Encodes string with UTF-8.
    msg_json_utf8 = msg_json.encode("utf-8")
    # Writes the message size. (Writing to buffer because writing bytes object.)
    sys.stdout.buffer.write(struct.pack("i", len(msg_json_utf8)))
    # Writes the message itself. (Writing to buffer because writing bytes object.)
    sys.stdout.buffer.write(msg_json_utf8)

# Function to read a message from Chrome.
def read_message():
    # Reads the first 4 bytes of the message (which designates message length).
    text_length_bytes = sys.stdin.buffer.read(4)

    if len(text_length_bytes) == 0:
        send_message({"error": "Empty Message"})
        sys.exit(0)

    # Unpacks the first 4 bytes that are the message length. [0] required because unpack returns tuple with required data at index 0.
    text_length = struct.unpack("i", text_length_bytes)[0]

    # Read the text (JSON object) of the message.
    text = sys.stdin.buffer.read(text_length).decode('utf-8')
    jsonRes = json.loads(text)

    # Read the config file
    with open('config-win.json') as f:
        config = json.load(f)

    # Create folder
    path = config['base_path'] + jsonRes['platform'] + '/' + jsonRes['title'] + '/'
    if not os.path.exists(path):
        os.makedirs(path)

    # Create tests file and write testCases
    if not os.path.exists(path + '/tests'):
        tests = open(path + '/tests', 'w')
        tests.write(jsonRes['tests'])
        tests.close()

    # Open Gvim
    subprocess.call(['gvim', '--remote-tab', path  + config['program_name']])

    # Program Ends Successfully
    send_message({"response": "Successfully created the tests file!"})


def Main():
    read_message()


if __name__ == '__main__':
    Main()
