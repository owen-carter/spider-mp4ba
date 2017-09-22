const fs       = require('fs');
module.exports = function (path, encode = 'utf8') {
    let links = (fs.readFileSync(path, encode)).split('\n');
    return links.map((link) => {
        return {
            'name': link.split(',')[0],
            'link': link.split(',')[1],
        };
    })
}


