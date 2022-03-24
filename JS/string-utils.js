const STRING = (function(){
    'use strict'
    
    const   capitalizeFirstLetter = function(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }   
    
    return  {
                capitalizeFirstLetter:capitalizeFirstLetter
            }

})();