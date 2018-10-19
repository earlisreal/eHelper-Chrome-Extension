#!/bin/bash

cd $(dirname $0)

mkdir -p /Library/Google/Chrome/NativeMessagingHosts
cp com.earl.ehelper.json /Library/Google/Chrome/NativeMessagingHosts
