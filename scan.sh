#!/bin/bash

IP=$1
TIME=$(date +%s)
FILE_NAME=nmap_scan_$TIME.xml
OUTPUT_LOCATION=/tmp/$FILE_NAME

# nmap -p 1-65535 -T4 -A -Pn -v $IP -oX $OUTPUT_LOCATION 1>/dev/null 2>/dev/null
nmap $IP -oX $OUTPUT_LOCATION 1>/dev/null 2>/dev/null
python jsonify.py $OUTPUT_LOCATION
rm $OUTPUT_LOCATION
