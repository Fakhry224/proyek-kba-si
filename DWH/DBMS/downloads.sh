#!/bin/bash

while read line; do
	wget "${line}"
done < "link_address.txt"

echo "Download selesai"
