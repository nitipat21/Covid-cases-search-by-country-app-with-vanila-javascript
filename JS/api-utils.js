const API = (function(){
    'use strict'

    const   casesUrl = "https://covid-api.mmediagroup.fr/v1/cases?country=",
            vaccinesUrl = "https://covid-api.mmediagroup.fr/v1/vaccines?country=",
            historyUrl = "https://covid-api.mmediagroup.fr/v1/history?country=",
            statusConfirmed = "&status=confirmed",
            statusDeaths = "&status=deaths",
            statusRecovered = "&status=recovered",
            allCountriesName = [],
            
            getAllCountriesName = async function(){
                try {
                                DOM.showLoadingText();
                                DOM.hideSearchBar();

                        const   allCountriesNameResponse = await fetch(vaccinesUrl),
                                allCountriesNameData = await allCountriesNameResponse.json(),
                                allCountriesNameCloneArray = Object.keys(allCountriesNameData);
                                allCountriesName.push(...allCountriesNameCloneArray);

                                DOM.hideLoadingText();
                                DOM.showSearchBar();

                } catch(error) {
                    console.log(error);
                }
            },

            getSearchCasesResponse = async function(){
                try {
                        const   searchCasesResponse = await fetch(casesUrl + STRING.capitalizeFirstLetter(DOM.searchBox.value)),
                                casesData = await searchCasesResponse.json(),
                                countryName = casesData.All.country,
                                updatedDate = casesData.All.updated,
                                undifinedDate = "unknown";

                        if (updatedDate) {
                            return {
                                countryName:countryName,
                                updatedDate:updatedDate
                            }
                        } else {
                            return {
                                countryName:countryName,
                                updatedDate:undifinedDate
                            }
                        }

                        

                } catch(error) {
                    console.log(error);
                }
            },

            getSearchVaccineResponse = async function(){
                try {
                        const   searchVaccinesResponse = await fetch(vaccinesUrl + STRING.capitalizeFirstLetter(DOM.searchBox.value)),
                                vaccinesData = await searchVaccinesResponse.json(),
                                countryPopulation = vaccinesData.All.population,
                                peopleVaccinated = vaccinesData.All.people_vaccinated;

                        return {
                                countryPopulation:countryPopulation,
                                peopleVaccinated:peopleVaccinated
                        }

                } catch(error) {
                    console.log(error);
                }
            },

            getSearchHistoryConfirmResponse = async function(){
                try {
                        const   searchHistoryConfirmResponse = await fetch(historyUrl + STRING.capitalizeFirstLetter(DOM.searchBox.value) + statusConfirmed),
                                historyConfirmData = await searchHistoryConfirmResponse.json(),
                                totalConfirmDates = historyConfirmData.All.dates,
                                totalConfrimToday = Object.values(totalConfirmDates)[0],
                                totalConfrimYesterday = Object.values(totalConfirmDates)[1],
                                todayConfirm = totalConfrimToday - totalConfrimYesterday;

                        return  {
                                    totalConfrimToday:totalConfrimToday,
                                    todayConfirm:todayConfirm
                                }

                } catch(error) {
                    console.log(error);
                }
            },

            getSearchHistoryDeathsResponse = async function(){
                try {
                        const   searchHistoryDeathsResponse = await fetch(historyUrl + STRING.capitalizeFirstLetter(DOM.searchBox.value) + statusDeaths),
                                historyDeathsData = await searchHistoryDeathsResponse.json(),
                                totalDeathsDates = historyDeathsData.All.dates,
                                totalDeathsToday = Object.values(totalDeathsDates)[0],
                                totalDeathsYesterday = Object.values(totalDeathsDates)[1],
                                todayDeaths = totalDeathsToday - totalDeathsYesterday;;

                        return  {
                                    totalDeathsToday:totalDeathsToday,
                                    todayDeaths:todayDeaths
                                }
                } catch(error) {
                    console.log(error);
                }
            },

            getSearchHistoryRecoveredResponse = async function(){
                try {
                        const   searchHistoryRecoveredResponse = await fetch(historyUrl + STRING.capitalizeFirstLetter(DOM.searchBox.value) + statusRecovered),
                                historyRecoveredData = await searchHistoryRecoveredResponse.json(),
                                totalRecoveredDates = historyRecoveredData.All.dates,
                                totalRecoveredToday = Object.values(totalRecoveredDates)[0],
                                totalRecoveredYesterday = Object.values(totalRecoveredDates)[1],
                                todayRecovered = totalRecoveredToday - totalRecoveredYesterday;;

                        return  {
                                    totalRecoveredToday:totalRecoveredToday,
                                    todayRecovered:todayRecovered
                                }

                } catch(error) {
                    console.log(error);
                }
            },

            getAllSearchResponse = async function(){
                try {   
                        if (DOM.resultContainer.childElementCount < 2) {

                        DOM.showLoadingText();
                        DOM.hideSearchBar();

                        const   searchCasesResponse = await getSearchCasesResponse(),
                                countryName = searchCasesResponse.countryName,
                                updatedDate = searchCasesResponse.updatedDate,
                                searchVaccineResponse = await getSearchVaccineResponse(),
                                countryPopulation = searchVaccineResponse.countryPopulation,
                                peopleVaccinated = searchVaccineResponse.peopleVaccinated,
                                searchHistoryConfirmResponse = await getSearchHistoryConfirmResponse(),
                                totalConfirmToday = searchHistoryConfirmResponse.totalConfrimToday,
                                todayConfirm = searchHistoryConfirmResponse.todayConfirm,
                                searchHistoryDeathsResponse = await getSearchHistoryDeathsResponse(),
                                totalDeathsToday = searchHistoryDeathsResponse.totalDeathsToday,
                                todayDeaths = searchHistoryDeathsResponse.todayDeaths,
                                searchHistoryRecoveredResponse = await getSearchHistoryRecoveredResponse(),
                                totalRecoveredToday = searchHistoryRecoveredResponse.totalRecoveredToday,
                                todayRecovered = searchHistoryRecoveredResponse.todayRecovered,
                                vaccinatedPercent = STRING.calculatePercentage(peopleVaccinated,countryPopulation),
                                deathsPercent = STRING.calculatePercentage(totalDeathsToday,totalConfirmToday),
                                dailyRatio = todayConfirm/todayRecovered,
                                dataArray = [];

                        // create country card
                        dataArray.push(countryName,countryPopulation,peopleVaccinated,totalConfirmToday,todayConfirm,totalDeathsToday,todayDeaths,totalRecoveredToday,todayRecovered,updatedDate);

                        DOM.createCountryCard((STRING.formatArraytoNumberWithCommas(dataArray)));

                        // set Local storage
                        localStorage.setItem(countryName,JSON.stringify(dataArray));

                        // create compare card
                        if (DOM.resultContainer.childElementCount == 1) {

                            localStorage.setItem("firstCountry",JSON.stringify([countryName,vaccinatedPercent,deathsPercent,dailyRatio]));

                        } else if (DOM.resultContainer.childElementCount > 1) {

                            localStorage.setItem("secondCountry",JSON.stringify([countryName,vaccinatedPercent,deathsPercent,dailyRatio]));

                            const   firstCountry = Array.from(LOCALSTORAGE.getLocalStorage("firstCountry")),
                                    secondCountry = Array.from(LOCALSTORAGE.getLocalStorage("secondCountry")),
                                    bothCountries = [...firstCountry,...secondCountry],
                                    compareResult = STRING.compareBetweenArrays(firstCountry,secondCountry);
                            
                            localStorage.setItem("bothCountries",JSON.stringify(bothCountries));
                            localStorage.setItem("compareList",JSON.stringify(compareResult));

                            const   bothCountriesLocalStorage = Array.from(JSON.parse(localStorage.getItem("bothCountries"))),
                                    compareResultLocalStorage = Array.from(JSON.parse(localStorage.getItem("compareList")));

                            DOM.generateCompareText(bothCountriesLocalStorage,compareResultLocalStorage);
                            DOM.showTextCompareResult();

                        }
                        
                        DOM.searchBox.value = "";
                        DOM.hideLoadingText();
                        DOM.showSearchBar();

                    } else {

                        alert ("show only 2 countries");

                    }

                } catch(error) {

                    console.log(error);
                    
                }
            }

    return  {   
                getAllCountriesName:getAllCountriesName,
                getAllSearchResponse: getAllSearchResponse,
                getSearchVaccineResponse:getSearchVaccineResponse,
                allCountriesName:allCountriesName
            }

})();