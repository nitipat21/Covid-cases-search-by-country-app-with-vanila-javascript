const LOCALSTORAGE = (function(){
    'use strict'

    const   getLocalStorage = function(key){
            
            const data = localStorage.getItem(key);

            return JSON.parse(data);
    }
    
    return  {
                getLocalStorage:getLocalStorage    
            }
    
})();