#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');
const {Transform, pipeline} = require('stream');
const caesar_cipher = require('../cipher-lib');
const { MESSAGE } = require('../messages');

let err = false;

program 
    .version(MESSAGE['VERSION'])
    .description(MESSAGE['DESCRIPTION']);

program
    .option('-d, --debug', 'Debug')
    .option('-a, --action <action>', 'Required option. Action encode or decode.')
    .option('-s, --shift <shift>', 'Required option. Shift.')
    .option('-i, --input [input file]', 'Optional. input file')
    .option('-o, --output [output file]', 'Optional. output file');

program.addHelpText('after', MESSAGE['USAGE']);

program.parse(process.argv);

const options = program.opts();


//validate action
if(options.action === undefined) { 
    process.stderr.write( MESSAGE['NOACTION'] ); 
    err = true;
}else if( !['encode', 'decode', 'ENCODE', 'DECODE'].includes(options.action) ){
    process.stderr.write(MESSAGE['INVALID_ACTION']);
    err = true;
}

//validate shift
if(options.shift === undefined) { 
    process.stderr.write( MESSAGE['NOSHIFT'] );
    err = true;
}else if( !Number.isInteger( parseInt(options.shift) ) ){
    process.stderr.write( 'Shift should be a number' );

    err = true;
}else{
    options.shift = parseInt(options.shift);
} 

//validate input file path, check if exists
if(options.input) {

    if( typeof(options.input) === "boolean" ) {
        process.stderr.write("Please provide input file name");
        err = true;
    }else{
          // Check if the file exists in the current directory, and if it is readable.
        fs.access(options.input, fs.constants.F_OK | fs.constants.R_OK, (err) => {
            if (err) {
            console.error(
                `Input file ${err.code === 'ENOENT' ? 'does not exist' : 'is not readable'}`);
                err = true;
            } 
        });

        var useInputFile = true;
    }


}

//validate ouput file path, check if exists and writable 
if(options.output && typeof options.output === "string" ) {
        
    // Check if the file exists in the current directory, and if it is writable.
    fs.access(options.output, fs.constants.F_OK | fs.constants.W_OK, (err) => {
        if (err) {
        console.error(
            `Output file ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`);
            err = true;
        } 
    });

    var useOutputFile = true;
}

if( err ){
    process.stderr.write(MESSAGE['USAGE']);
    process.exit(1);
}

if(options.debug) console.log(options);

switch( options.action.toLowerCase() ){
    
    case 'encode':

        const encodeStream = new Transform({
            transform(chunk, _, cb) {
              cb(null, caesar_cipher.encode(options.shift, chunk.toString()) );
            }
          });

        pipeline(
            useInputFile ? fs.createReadStream(options.input) : process.stdin,
            encodeStream,
            useOutputFile ? fs.createWriteStream(options.output, { flags: 'a' }) : process.stdout,
            (err) => {
              if (err) {
                process.stderr.write('Stream error')
              }
            }
          );

    break;
    
    case 'decode':

        const decodeStream = new Transform({
            transform(chunk, _, cb) {
                cb(null, caesar_cipher.decode(options.shift, chunk.toString()) );
            }
            });  

        pipeline(
            useInputFile ? fs.createReadStream(options.input) : process.stdin,
            decodeStream,
            useOutputFile ? fs.createWriteStream(options.output, { flags: 'a' }) : process.stdout,
            (err) => {
              if (err) {
                process.stderr.write('Stream error')
              }
            }
          );
    break;

    default:
    break;       
}


