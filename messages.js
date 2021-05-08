const MESSAGE = {
    "VERSION":        '1.0.0',
    "DESCRIPTION":    'Caesar cipher CLI tool',
    "NOACTION":       `Missing action parameter, please provide \"encode\" to encode or \"decode\" to decode input text using -a or --action option\n\r\n\r`,
    "NOSHIFT":        'Missing shift parameter, please provide a shift using -s or --shift option\n\r\n\r',
    "USAGE":          '\n\rExample call:\n\r$ caesar-cipher -a encode -s 7 -i ./source_file -o ./destination_file\n\r',
    "INVALID_ACTION": 'Invalid action used please use "encode" or "decode" \n\rType "command --help" for more help \n\r',

    "INPUTNOTFOUND": 'Input file does not exist',
    "OUTPUTNOTFOUND": 'Input file does not exist',
}

module.exports = {
    MESSAGE
}