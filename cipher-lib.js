const encode = (shift, input) => {
    let output = '';
    const maxShift = 26;
    
    if(Math.abs(shift) > maxShift) shift %= maxShift;
    
    output = input.split("").map( (letter) => {
     
      let code = letter.charCodeAt(0);
       
      if( (/[a-zA-Z]/).test( letter ) ){    
      
          if(letter === letter.toUpperCase()){
          if ( (code + shift) < "A".charCodeAt(0)) code = code + (maxShift - Math.abs(shift) );
          else
            if ( (code + shift) > "Z".charCodeAt(0)) code = code - (maxShift - Math.abs(shift) );
          else
            code = code + shift;
            
       }else{
      
          if ( (code + shift) < "a".charCodeAt(0)) code = code + (maxShift - Math.abs(shift) );
          else
            if ( (code + shift) > "z".charCodeAt(0)) code = code - (maxShift - Math.abs(shift) );          
          else
            code = code + shift;
       }
            
            return String.fromCharCode(code);  
          }else{      
  
            return letter;
      }  
  
      } );
   
    return output.join("");
  }


const decode = (shift, input) => {
    let output = '';
    const maxShift = 26;    
    
    if(Math.abs(shift) > maxShift) shift %= maxShift;
    
    output = input.split("").map( (letter) => {
     
      let code = letter.charCodeAt(0);
       
      if( (/[a-zA-Z]/).test( letter ) ){    
      
          if(letter === letter.toUpperCase()){
          if ( (code - shift) < "A".charCodeAt(0)) code = code + (maxShift - Math.abs(shift) );
          else
            if ( (code - shift) > "Z".charCodeAt(0)) code = code - (maxShift - Math.abs(shift) );
          else
            code = code - shift;
            
       }else{
      
          if ( (code - shift) < "a".charCodeAt(0)) code = code + (maxShift - Math.abs(shift) );
          else
            if ( (code - shift) > "z".charCodeAt(0)) code = code - (maxShift - Math.abs(shift) );          
          else
            code = code - shift;
       }
            
            return String.fromCharCode(code);  
          }else{      
  
            return letter;
      }  
  
      } );
   
    return output.join("");
  }  


module.exports = {
    encode,
    decode
}