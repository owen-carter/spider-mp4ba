#! /usr/bin/env bash
# author : owen-carter

echo "start to deploy spider-mp4ba project..."
echo "you must installed the node and git"
git clone https://github.com/owen-carter/spider-mp4ba.git
cd spider-mp4ba
npm install
echo "deploy the spider success!"
npm run app




