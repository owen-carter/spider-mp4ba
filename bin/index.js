/**
 * Created by owen on 2017/8/12.
 */

const fs      = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const iconv   = require('iconv-lite');
const logger  = require('../utils/log');

class Spider {
    /***
     * define all configure
     */
    constructor() {
        this.filename         = './magnet.csv';
        this.pageNumberLimit  = 1;
        this.urlPool          = [];
        this.videoPageUrlList = [];
        this.makeUrlFn        = null;
    }

    /***
     * 加载配置
     * @returns {Spider}
     */
    loadConfig(conf) {
        if (conf.hasOwnProperty('pageNumberLimit')) {
            this.pageNumberLimit = conf['pageNumberLimit'];
        } else {
            logger.info('pageNumberLimit dose not exist!');
        }
        if (conf.hasOwnProperty('filename') && conf['filename'] !== '') {
            this.filename = conf['filename'];
        } else {
            logger.info('filename dose valid!');
        }
        return this;
    }

    url(fn) {
        if (typeof fn === 'function') {
            this.makeUrlFn = fn;
        }
        if (Object.prototype.toString.call(fn) === '[object Array]') {
            this.urlPool = fn;
        }
        return this;
    }

    /***
     * 初始化战场
     * @returns {Spider}
     */
    init() {
        this.urlPool = this.makeUrlFn();
        return this;
    }


    fetch(href, callBack) {
        href     = `${href}`;
        let conf = {
            url     : href,
            method  : "GET",
            encoding: null,
            headers : {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36'
            }
        };
        logger.info(`start access proxy ${href}`);
        request(conf, (error, response, body) => {
            if (error) {
                logger.error(`get a page ${href} fail!`);
                return;
            }
            logger.info(`gotten a page ${href} succeed!`);
            body = iconv.decode(body, 'gb2312');
            callBack(body)
        });
    }


    /***
     * 解析分页页面
     * @param html
     */
    parsePage(html) {
        let $, name, hrefList, href;
        $        = cheerio.load(html, {decodeEntities: false});
        hrefList = $('#threadlist form table > tbody > tr > th > a');

        hrefList.each((index, element) => {
            name = $(element).text();
            href = $(element).attr('href');
            if (href !== void (0)) {
                logger.info(`parsed a href ${href}`);
                this.videoPageUrlList.push(href);
            } else {
                logger.error('has no href');
            }
        });
        if (this.urlPool.length !== 0) {
            this.fetch(this.urlPool.pop(), this.parsePage.bind(this))
        } else {
            this.fetch(this.videoPageUrlList.pop(), this.parseMagnet.bind(this))
        }

    }

    /***
     * 解析视频页面磁链地址
     */
    parseMagnet(html) {
        let $, name, href;
        $    = cheerio.load(html, {decodeEntities: false});
        name = $('#thread_subject').text();
        href = $('#top > p > a').attr('href');
        logger.info(`collected: ${name.replace(/\n/g, '')} -- ${href}`);
        this.save(this.filename, `${name},${href}`);
        if (this.videoPageUrlList.length !== 0) {
            this.fetch(this.videoPageUrlList.pop(), this.parsePage.bind(this))
        }
        logger.info('done');
    }


    /***
     * 保存文件
     * @param filename
     * @param line
     */
    save(filename, line) {
        fs.exists(filename, (exists) => {
            if (exists) {
                fs.appendFile(filename, `${line}\n`, 'utf8', (err) => {
                    if (err) throw err;
                    logger.info(`${line} appendTo ${filename} success!`);
                });
            } else {
                fs.appendFile(filename, ``, 'utf8', (err) => {
                    if (err) throw err;
                    logger.error(`${filename} does not exist,so create it,and succeed!`);
                });

            }
        });
    }

    /***
     * 启动
     */
    run() {
        if (this.urlPool.length === 0) {
            logger.error('urlPool is empty! exited');
            return;
        }
        this.fetch(this.urlPool.pop(), this.parsePage.bind(this))
    }
}

module.exports = Spider;