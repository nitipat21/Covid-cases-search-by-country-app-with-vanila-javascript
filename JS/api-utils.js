const API = (function(){
    'use strict'

    const   casesUrl = "https://covid-api.mmediagroup.fr/v1/cases?country=",
            vaccinesUrl = "https://covid-api.mmediagroup.fr/v1/vaccines?country=",
            historyUrl = "https://covid-api.mmediagroup.fr/v1/history?country=",
            statusConfirmed = "&status=confirmed",
            statusDeaths = "&status=deaths",
            statusRecovered = "&status=recovered",

            
            getResponse = async function(){
                try {
                        const   countriesNameResponse = await fetch(casesUrl),
                                contriesData = await countriesNameResponse.json(),
                                countriesNameArray = Object.keys(contriesData),
                                searchCasesResponse = await fetch(casesUrl + STRING.capitalizeFirstLetter(DOM.searchBox.value)),
                                casesData = await searchCasesResponse.json(),
                                searchVaccinesResponse = await fetch(vaccinesUrl + STRING.capitalizeFirstLetter(DOM.searchBox.value)),
                                vaccinesData = await searchVaccinesResponse.json();

                                console.log(casesData.All)
                                console.log(vaccinesData.All)
                                console.log(countriesNameArray)

                } catch(error) {
                    console.log(error);
                }
            };

    return  {
                getResponse: getResponse
            }

})();