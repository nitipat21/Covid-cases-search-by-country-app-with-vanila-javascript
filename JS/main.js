const MAIN = (function(){
    'use strict'

    DOM.showTextNoCompareResult();

    API.getAllCountriesName();

    STRING.autoComplete(DOM.searchBox,API.allCountriesName);

    DOM.submitBtn.addEventListener("click",API.getAllSearchResponse);

    if (localStorage.length) {
        if (localStorage.getItem("secondCountry")) {
            const   secondCountry = LOCALSTORAGE.getLocalStorage("secondCountry"),
                    secondCountryName = secondCountry[0],
                    secondCountryCard = LOCALSTORAGE.getLocalStorage(secondCountryName),
                    firstCountry = LOCALSTORAGE.getLocalStorage("firstCountry"),
                    firstCountryName = firstCountry[0],
                    firstCountryCard = LOCALSTORAGE.getLocalStorage(firstCountryName),
                    bothCountries = LOCALSTORAGE.getLocalStorage("bothCountries"),
                    compareList = LOCALSTORAGE.getLocalStorage("compareList");

            DOM.createCountryCard(STRING.formatArraytoNumberWithCommas(Array.from(firstCountryCard)));
            DOM.createCountryCard(STRING.formatArraytoNumberWithCommas(Array.from(secondCountryCard)));
            DOM.generateCompareText(Array.from(bothCountries),Array.from(compareList));
            DOM.showTextCompareResult();
            DOM.searchBox.value = "";

        } else {
            
            const   firstCountry = LOCALSTORAGE.getLocalStorage("firstCountry"),
                    firstCountryName = firstCountry[0],
                    firstCountryCard = LOCALSTORAGE.getLocalStorage(firstCountryName);

            DOM.createCountryCard(STRING.formatArraytoNumberWithCommas(Array.from(firstCountryCard)));
            DOM.searchBox.value = "";
        }
    }
    
})();