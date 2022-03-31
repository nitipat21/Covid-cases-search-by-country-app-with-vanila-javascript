const DOM = (function(){
    'use strict'
    
    const   searchBox = document.querySelector(".searchBox"),
            submitBtn = document.querySelector(".submitBtn"),
            resultContainer = document.querySelector(".result-container"),
            compareInfo = document.querySelector(".compare-info"),
            loadingText = document.querySelector("#loading"),

            createCountryCard = function(array){
                if (resultContainer.childElementCount < 2) {
                    
                    const countryCard = `
                                        <div class="result">
                                            <div class="btn-container">
                                                <button class="removeBtn" onclick="DOM.removeCountryCard(this)">X</button>
                                            </div>
                                                <div class="result-header-container">
                                                <h1 class="result-header">${array[0]}</h1>
                                            </div>
                                            <div class="result-text-container">
                                                <div class="result-text" id="population">
                                                    <h3>Population:</h3><p>${array[1]}</p>
                                                </div>
                                                <div class="result-text" id="vaccinated">
                                                    <h3>Vaccinated:</h3><p>${array[2]}</p>
                                                </div>
                                                <div class="result-text" id="total-cases">
                                                    <h3>Total Cases:</h3><p>${array[3]}</p>
                                                </div>
                                                <div class="result-text" id="today-cases">
                                                    <h3>Today Cases:</h3><p>${array[4]}</p>
                                                </div>
                                                <div class="result-text" id="total-deaths">
                                                    <h3>Total Deaths:</h3><p>${array[5]}</p>
                                                </div>
                                                <div class="result-text" id="today-deaths">
                                                    <h3>Today Deaths:</h3><p>${array[6]}</p>
                                                </div>
                                                <div class="result-text" id="total-recovered">
                                                    <h3>Total Recovered:</h3><p>${array[7]}</p>
                                                </div>
                                                <div class="result-text" id="today-recovered">
                                                    <h3>Today Recovered:</h3><p>${array[8]}</p>
                                                </div>
                                                <div class="result-text" id="updated-date">
                                                    <h3>Updated Date</h3><p>${array[9]}</p>
                                                </div>
                                            </div>
                                        </div>`;
                                    
                    resultContainer.innerHTML += countryCard;

                    DOM.showTextNoCompareResult();
                    
                } else {
                    alert ("show only 2 countries");
                }
            },

            removeCountryCard = function(event){
                const   thisResult = event.parentElement.parentElement,
                        thisCountryName = event.parentElement.parentElement.firstElementChild.nextElementSibling.firstElementChild.textContent,
                        firstCountry = Array.from(JSON.parse(localStorage.getItem("firstCountry")));
                        

                if (resultContainer.childElementCount > 1) {

                    const secondCountry = Array.from(JSON.parse(localStorage.getItem("secondCountry")));

                        if (firstCountry.includes(thisCountryName)) {
                            console.log("this first country")
                            localStorage.removeItem("firstCountry");
                            localStorage.removeItem("secondCountry");
                            localStorage.setItem("firstCountry",JSON.stringify(secondCountry));
                        } else if (secondCountry.includes(thisCountryName)) {
                            console.log("this second country")
                            localStorage.removeItem("firstCountry");
                            localStorage.removeItem("secondCountry");
                            localStorage.setItem("firstCountry",JSON.stringify(firstCountry));
                        }

                } else {

                    localStorage.removeItem("firstCountry");
                    localStorage.removeItem("secondCountry");

                }

                        localStorage.removeItem(thisCountryName);
                        localStorage.removeItem("bothCountries");
                        localStorage.removeItem("compareList");
                        
                        resultContainer.removeChild(thisResult);

                        if (resultContainer.childElementCount < 1) {
                            compareInfo.removeChild(compareInfo.firstChild);
                            DOM.showTextNoCompareResult();

                        } else {
                            DOM.showTextNoCompareResult();
                        }
            },

            generateCompareText = function(countriesArray,compareResultArray){
                if (compareInfo.childElementCount < 1) {
                    const compareCard = `<table class="compare-table">
                                            <tr class="row-header">
                                                <th>Country Name</th>
                                                <th>Vaccinated %</th>
                                                <th>Deaths %</th>
                                                <th>Today(Cases/Recovered)</th>
                                            </tr>
                                            <tr class="first-country">
                                                <th id="first-country-name">${countriesArray[0]}</th>
                                                <th>${countriesArray[1].toFixed(2)}%</th>
                                                <th>${countriesArray[2].toFixed(2)}%</th>
                                                <th id="first-country-dailyRatio">${countriesArray[3]}</th>
                                            </tr>
                                            <tr class="second-country">
                                                <th id="second-country-name">${countriesArray[4]}</th>
                                                <th>${countriesArray[5].toFixed(2)}%</th>
                                                <th>${countriesArray[6].toFixed(2)}%</th>
                                                <th id="second-country-dailyRatio">${countriesArray[7]}</th>
                                            </tr>
                                            <tr class="compare-result">
                                                <th>Result</th>
                                                <th><span id="compare-text-1"></span><span id="compare-result-1">${compareResultArray[0]}</span></th>
                                                <th><span id="compare-text-2"></span><span id="compare-result-2">${compareResultArray[1]}</span></th>
                                                <th><span id="compare-text-3"></span><span id="compare-result-3">${compareResultArray[2]}</span></th>
                                            </tr>
                                        </table>`

                    compareInfo.innerHTML += compareCard;
                }
            },

            showTextCompareResult = function(){
                const   compareResult1 = document.querySelector("#compare-result-1"),
                        compareResult2 = document.querySelector("#compare-result-2"),
                        compareResult3 = document.querySelector("#compare-result-3"),
                        compareText1 = document.querySelector("#compare-text-1"),
                        compareText2 = document.querySelector("#compare-text-2"),
                        compareText3 = document.querySelector("#compare-text-3"),
                        firstCountryName = document.querySelector("#first-country-name"),
                        secondCountryName = document.querySelector("#second-country-name"),
                        firstCountryDailyRatio = document.querySelector("#first-country-dailyRatio"),
                        secondCountryDailyRatio = document.querySelector("#second-country-dailyRatio");

                // 1st

                if (compareResult1.textContent > 0) {
                    compareText1.textContent = `${firstCountryName.textContent} >`
                    compareResult1.textContent = `${Math.abs(compareResult1.textContent).toFixed(2)}%`
                } else if (compareResult1.textContent < 0) {
                    compareText1.textContent = `${secondCountryName.textContent} >`
                    compareResult1.textContent = `${Math.abs(compareResult1.textContent).toFixed(2)}%`
                }

                // 2nd

                if (compareResult2.textContent > 0) {
                    compareText2.textContent = `${firstCountryName.textContent} >`
                    compareResult2.textContent = `${Math.abs(compareResult2.textContent).toFixed(2)}%`
                } else if (compareResult2.textContent < 0) {
                    compareText2.textContent = `${secondCountryName.textContent} >`
                    compareResult2.textContent = `${Math.abs(compareResult2.textContent).toFixed(2)}%`
                }

                // 3nd

                if (compareResult3.textContent > 0) {
                    compareText3.textContent = `${firstCountryName.textContent} >`
                    compareResult3.textContent = `${Math.abs(compareResult3.textContent).toFixed(2)}%`
                } else if (compareResult3.textContent < 0) {
                    compareText3.textContent = `${secondCountryName.textContent} >`
                    compareResult3.textContent = `${Math.abs(compareResult3.textContent).toFixed(2)}%`
                } else if (isNaN(compareResult3.textContent)) {
                    compareText3.textContent = ""
                    compareResult3.textContent = "-"
                }

                if (isNaN(firstCountryDailyRatio.textContent) || firstCountryDailyRatio.textContent === "Infinity") {
                    firstCountryDailyRatio.textContent = "-"
                }

                if (isNaN(secondCountryDailyRatio.textContent) || secondCountryDailyRatio.textContent === "Infinity") {
                    secondCountryDailyRatio.textContent = "-"
                }
            },
            
            showTextNoCompareResult = function(){
                if (resultContainer.childElementCount == 0) {
                    const text = `<p class="noCompare-text">Add country name to search Covid data</p>`
                    compareInfo.innerHTML += text;
                } else if (resultContainer.childElementCount < 2) {
                    const text = `<p class="noCompare-text">Add more country to compare data</p>`
                    compareInfo.removeChild(compareInfo.firstChild);
                    compareInfo.innerHTML += text;
                } else if (resultContainer.childElementCount == 2) {
                    compareInfo.removeChild(compareInfo.firstChild);
                }
            },

            showLoadingText = function(){
                loadingText.classList.add("display");
                
            },

            hideLoadingText = function(){
                loadingText.classList.remove("display");
            },

            showSearchBar = function(){
                searchBox.classList.remove("hidden");
                submitBtn.classList.remove("hidden");
            },

            hideSearchBar = function(){
                searchBox.classList.add("hidden");
                submitBtn.classList.add("hidden");
            };

    return  {
                searchBox:searchBox,
                submitBtn:submitBtn,
                resultContainer:resultContainer,
                createCountryCard:createCountryCard,
                removeCountryCard:removeCountryCard,
                generateCompareText:generateCompareText,
                showTextCompareResult:showTextCompareResult,
                showTextNoCompareResult:showTextNoCompareResult,
                showLoadingText:showLoadingText,
                hideLoadingText:hideLoadingText,
                showSearchBar:showSearchBar,
                hideSearchBar,hideSearchBar
            }
})();

