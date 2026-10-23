#!/bin/zsh
# Double-click to preview the website at http://localhost:8080
cd "$(dirname "$0")"
[ -d node_modules ] || npm install
(sleep 6 && open "http://localhost:8080") &
npm start
