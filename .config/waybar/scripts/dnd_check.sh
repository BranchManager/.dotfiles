#!/bin/bash

dnd=$(swaync-client -D)

if [ "$dnd" = "true" ]; then
    echo "{\"text\": \"text\", \"alt\": \"true\", \"tooltip\": \"false\", \"class\": \"button\" }"
else
    echo "{\"text\": \"text\", \"alt\": \"false\", \"tooltip\": \"false\", \"class\": \"button\" }"
fi

exit 0
