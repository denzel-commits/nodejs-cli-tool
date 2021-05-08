#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');
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
    fs.access(options.input, fs.constants.F_OK | fs.constants.W_OK, (err) => {
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
/*
use streams
pipeline(
    input ?  input_stream :  process.stdin, // input file stream or stdin stream
    transform(args), // Transform stream
    output ?  output_stream :  process.stdout // output file stream or stdout stream
  )
*/
switch( options.action.toLowerCase() ){
    
    case 'encode':

        if( useInputFile ){
            //get file contents string
            const fileContent = fs.readFileSync(options.input, 'utf8');

            //use file contents
            fileEncodedContent = caesar_cipher.encode(options.shift, fileContent);

            //get file contents string
            fs.appendFileSync(options.output, fileEncodedContent);
        }else{
            process.stdin.pipe(require('split')()).on('data', processLine);

            function processLine (line) {
                console.log( caesar_cipher.encode(options.shift, line) );
            }
        }    
    break;
    
    case 'decode':
        //get file contents string
        const fileToDecodeContent = fs.readFileSync(options.input, 'utf8');

        //use file contents
        console.log ( caesar_cipher.decode(options.shift, fileContent) );
    break;

    default:

    break;       
}


