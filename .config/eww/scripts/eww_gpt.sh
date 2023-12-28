#!/bin/bash

key=$(cat ~/.config/.openai_key)
export OPENAI_API_KEY=$key

run_gpt(){

    output=$(sgpt "$1")
    echo $output
    eww update output="$output"
    
}



#echo "$1">rm_this.txt
if [ "$1" == "clear" ]; then
    eww update show_gpt="false"
    eww update gpt_placeholder="Ask me anything..."
    eww update searchbar_class="search_bar"
else
    eww update show_gpt="true"
    eww update output="Thinking..."
    #echo $1
    run_gpt "$1" &
fi

