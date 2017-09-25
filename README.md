# spider-mp4ba [![Build Status](https://www.travis-ci.org/owen-carter/spider-mp4ba.svg?branch=master)](https://www.travis-ci.org/owen-carter/spider-mp4ba)
> 一个爬mp4ba的爬虫，使用nodejs编写

### 如何开始？
- 手动方式
	- git clone https://github.com/owen-carter/spider-mp4ba.git
	- cd spider-mp4ba
	- npm install
	- npm run app
- 自动
```bash
curl -o- https://raw.githubusercontent.com/owen-carter/spider-mp4ba/master/start.sh | bash
```


### 关于mp4ba
- 采集到的并不完全都是磁性连接
- 由于真正的mp4ba已经不存在了，所以很多资源已经无法下载到了
- 所以采集到的链接资源需要处理一下


### 过滤磁性连接
```bash
   cat final.csv | grep magnet > x.scv
```

### Changelog
- 
- 





