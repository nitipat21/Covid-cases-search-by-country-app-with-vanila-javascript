const MAIN = (function(){
    'use strict'

    API.getAllCountriesName();

    STRING.autoComplete(DOM.searchBox,API.allCountriesName);

    DOM.submitBtn.addEventListener("click",API.getAllSearchResponse);
    
})();