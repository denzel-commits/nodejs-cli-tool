const { accessSync, constants } = require('fs');

module.exports = {

    validateShift: (param) => {

        if(param === undefined) { 
            return 'Missing shift, please provide a shift via --shift option';            
        }else if( !Number.isInteger( parseInt(param) ) ){
            return 'Shift must be an integer value'; 
        }else{
            return false;
        }

    },

    validateAction: (param) => {
        if(param === undefined) { 
            return 'Missing action, please provide "encode" to encrypt or "decode" to decrypt input text via --action option'; 
        }else if( !['encode', 'decode'].includes(param.toLowerCase()) ){
            return 'Invalid action, please use "encode" or "decode"';
        }else{
            return false;
        }
    },

    validateInput: (param) => {
        if( typeof(param) === "string" ) {
            try {
                accessSync(param, constants.F_OK | constants.R_OK);                    
              } catch (err) {
                return `Input file ${err.code === 'ENOENT' ? 'does not exist, please provide correct file path' : 'is not readable'}`;                    
              }

            return false;
        }       
    },

    validateOutput: (param) => {
        if( typeof(param) === "string" ) {         
            try {
                accessSync(param, constants.F_OK | constants.W_OK);
              } catch (err) {
                return `Output file ${err.code === 'ENOENT' ? 'does not exist, please provide correct file path' : 'is read-only'}`
              }
            
            return false; 
        }             

    },
    
    validateReqInput: (param) => {
            if( typeof(param) === "boolean" ) {
                return 'Input filename is missing, please provide filename or remove "--input" option';              
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

    validateReqOutput: (param) => {
        if( typeof(param) === "boolean" ) {
            return 'Output filename is missing, please provide filename or remove "--output" option';            
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