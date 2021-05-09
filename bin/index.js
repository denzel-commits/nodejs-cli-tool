#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');
const {Transform, pipeline} = require('stream');
const caesar_cipher = require('../cipher-lib');
const validation = require('../validation');

let validationErr = false;

program 
    .version('1.0.0')
    .description('Caesar cipher CLI tool');

program
    .option('-d, --debug', 'Debug')
    .option('-a, --action <action>', 'Required option. Values supported: "encode", "decode".')
    .option('-s, --shift <number>', 'Required option. Shift.')
    .option('-i, --input [input file]', 'Optional. Input file')
    .option('-o, --output [output file]', 'Optional. Output file');

program.addHelpText('after', 'Example call:\n\r$ caesar-cipher -a encode -s 7 -i ./demo/input.txt -o ./demo/output.txt');

program.parse(process.argv);

const options = program.opts();

if(options.debug) console.log(options);


if( err = validation.validateAction(options.action) ){
    console.error( err );
    validationErr = true;
}

if( err = validation.validateShift(options.shift) ){
    console.error( err );
    validationErr = true;
}else{
    options.shift = parseInt(options.shift);
}

var useInputFile = false;
if( options.input !== undefined && typeof(options.input) !== "boolean" ) {
    if( err = validation.validateInput(options.input) ){
        console.error( err );
        validationErr = true;
    }else{
        useInputFile = true;
    }
}

var useOutputFile = false;
if( options.output !== undefined && typeof(options.output) !== "boolean" ) {
    if( err = validation.validateOutput(options.output) ){
        console.error( err );
        validationErr = true;
    }else{
        useOutputFile = true;
    }
}

if( validationErr ){
    console.error('\n\rExample call:\n\r$ caesar-cipher -a encode -s 7 -i ./demo/input.txt -o ./demo/output.txt');
    process.exit(1);
}

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


