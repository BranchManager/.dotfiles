#!/bin/bash

count=$(swaync-client -c)

if [ $count -gt 0 ]; then
    echo ""
else
    echo ""
fi