#!/bin/bash

IP=$1
ARGS=$2
TIME=$(date +%s)
FILE_NAME=nmap_scan_$TIME.xml
OUTPUT_LOCATION=/tmp/$FILE_NAME

nmap $ARGS -oX $OUTPUT_LOCATION $IP 1>/dev/null 2>/dev/null
python nmap/jsonify.py $OUTPUT_LOCATION
