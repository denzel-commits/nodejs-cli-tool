const {Transform} = require('stream');
const caesar_cipher = require('./cipher-lib');

module.exports = {

    encode: (shift) => { 
        return new Transform({
        transform(chunk, _, cb) {
            cb(null, caesar_cipher.encode(shift, chunk.toString()) );
        }
        });
    },    

    decode: (shift) => { 
        return  new Transform({
        transform(chunk, _, cb) {
            cb(null, caesar_cipher.decode(shift, chunk.toString()) );
        }
        });
    }   

}