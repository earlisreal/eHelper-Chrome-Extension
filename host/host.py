#!/usr/bin/python
# Copyright (c) 2012 The Chromium Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

# A simple native messaging host. Shows a Tkinter dialog with incoming messages
# that also allows to send message back to the webapp.

import struct
import sys
import threading
import subprocess
import os
import json

# On Windows, the default I/O mode is O_TEXT. Set this to O_BINARY
# to avoid unwanted modifications of the input/output streams.
if sys.platform == "win32":
  import msvcrt
  msvcrt.setmode(sys.stdin.fileno(), os.O_BINARY)
  msvcrt.setmode(sys.stdout.fileno(), os.O_BINARY)

# Helper function that sends a message to the webapp.
def send_message(message):
   # Write message size.
  sys.stdout.write(struct.pack('I', len(message)))
  # Write the message itself.
  sys.stdout.write(message)
  sys.stdout.flush()

# Thread that reads messages from the webapp.
def read_thread_func(queue):
  while 1:
    # Read the message length (first 4 bytes).
    text_length_bytes = sys.stdin.read(4)

    if len(text_length_bytes) == 0:
      sys.exit(0)

    # Unpack message length as 4 byte integer.
    text_length = struct.unpack('i', text_length_bytes)[0]

    # Read the text (JSON object) of the message.
    text = sys.stdin.read(text_length).decode('utf-8')
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
    send_message('{"response": "Successfully created the tests file!"}')

def Main():
    read_thread_func(None)
    sys.exit(0)

if __name__ == '__main__':
  Main()
