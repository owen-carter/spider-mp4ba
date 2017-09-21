#! /usr/bin/env bash
# author : owen-carter

printf "start to deploy spider-mp4ba project..."
printf "you must installed the node and git"
git clone git clone git@github.com:owen-carter/spider-mp4ba.git
cd spider-mp4ba
npm install
printf "deploy the spider success!"
npm run app




