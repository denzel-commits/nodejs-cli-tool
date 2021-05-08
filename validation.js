const { accessSync, constants } = require('fs');

module.exports = {

    validateShift: (param) => {

        if(param === undefined) { 
            return 'Missing shift parameter, please provide a shift using -s or --shift option';            
        }else if( !Number.isInteger( parseInt(param) ) ){
            return 'Shift should be a number'; 
        }else{
            return false;
        }

    },

    validateAction: (param) => {
        if(param === undefined) { 
            return 'Missing action parameter, please provide "encode" to encode or "decode" to decode input text using -a or --action option'; 
        }else if( !['encode', 'decode', 'ENCODE', 'DECODE'].includes(param) ){
            return 'Invalid action used please use "encode" or "decode" \n\rType "command --help" for more help';
        }else{
            return false;
        }
    },

    validateInput: (param) => {
            if( typeof(param) === "boolean" ) {
                return 'Input filename is empty, please add filename or remove "--input" option';              
            }else{
                
                try {
                    accessSync(param, constants.F_OK | constants.R_OK);                    
                  } catch (err) {
                    return `Input file ${err.code === 'ENOENT' ? 'does not exist' : 'is not readable'}`;                    
                  }
            }       
            
            if( typeof(param) === "string" ) {
                return false; 
            }
    },
    validateOutput: (param) => {
            if( typeof(param) === "boolean" ) {
                return 'Output filename is empty, please add filename or remove "--output" option';            
            }else{
                
                try {
                    accessSync(param, constants.F_OK | constants.W_OK);
                  } catch (err) {
                    return `Output file ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`
                  }
            }             

            if( typeof(param) === "string" ) {
                return false; 
            }
    },
}