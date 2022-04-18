if(process.env.NODE_ENV==='production'){
    module.exports = require('./prodConnection');
}else{
    module.exports = require('./devConnection');
}


