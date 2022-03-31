const MAIN = (function(){
    'use strict'

    DOM.showTextNoCompareResult();

    API.getAllCountriesName();

    STRING.autoComplete(DOM.searchBox,API.allCountriesName);

    DOM.submitBtn.addEventListener("click",API.getAllSearchResponse);
    
})();