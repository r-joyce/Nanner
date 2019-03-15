#!/bin/bash

TARGET=$1
ARGS=$2
TIME=$(date +%s)
FILE_NAME=masscan_scan_$TIME.json
OUTPUT_LOCATION=/tmp/$FILE_NAME

/usr/src/app/masscan/bin/masscan $ARGS -oJ $OUTPUT_LOCATION $TARGET 1>/dev/null 2>/dev/null
cat $OUTPUT_LOCATION

