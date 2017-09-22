const fs       = require('fs');
module.exports = function (path, encode = 'utf8') {
    return (fs.readFileSync(path, encode)).split('\n')
}


