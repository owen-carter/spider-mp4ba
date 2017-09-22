#! /usr/bin/env node
const fs        = require("fs");
const ejs       = require('ejs');
const csvReader = require('./utils/csvKit.js');
let tpl         = fs.readFileSync("./templates/index.html", "utf-8");
let links       = csvReader('./mp4ba视频地址final.csv');

console.dir(links);

links.length = 10;

let publish = ejs.render(tpl, {links: links, title: 'mp4ba'})

fs.writeFile('./docs/index.html', publish, {flag: 'w', encoding: 'utf-8', mode: '0666'}, function (err) {
    if (err) {
        console.log("文件写入失败")
    } else {
        console.log("文件写入成功");

    }

})

