#!/usr/bin/env bash

JS=$(esbuild --bundle "${1:-./main.ts}" --minify --format=esm --color=false)

while getopts :cbf flag; do
    case $flag in
    c) JS=$(cut -c 14- <<<"$JS") ;;
    f) JS="\(()=>{$JS})()" ;;
    b) JS="javascript:$JS" ;;
    *) exit 1 ;;
    esac
done
if [[ $2 == "c" || $2 == "bc" ]]; then JS=$(cut -c 14- <<<"$JS"); fi
if [[ ${2:0:1} == "b" ]]; then JS="javascript:$JS"; fi
wl-copy "$JS"
echo "$JS"
