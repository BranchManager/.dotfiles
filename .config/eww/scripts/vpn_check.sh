
OUT=$(tailscale status | grep "archbranchmain" | awk '{print $NF}')

if [[ $OUT == "" ]]; then
    OUT="discon"
    
fi
#echo "{\"online\": \"$OUT\"}" 
echo "{\"text\": \"text\", \"alt\": \"$OUT\", \"tooltip\": \"false\", \"class\": \"code\" }"