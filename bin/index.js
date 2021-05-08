#!/usr/bin/env node
const program = require('commander');
const { encode, decode } = require('../cipher-lib');
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

//validate ouput file path, check if exists and writable 

if( err ){
    process.stderr.write(MESSAGE['USAGE']);
    process.exit(1);
}

if(options.debug) console.log(options);
/*
pipeline(
    input ?  input_stream :  process.stdin, // input file stream or stdin stream
    transform(args), // Transform stream
    output ?  output_stream :  process.stdout // output file stream or stdout stream
  )
*/
switch( options.action.toLowerCase() ){
    
    case 'encode':
        console.log ( encode(options.shift, 'This is secret. Message about "_" symbol!') );
    break;
    
    case 'decode':
        console.log ( decode(options.shift, 'Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!') );
    break;

    default:

    break;       
}


