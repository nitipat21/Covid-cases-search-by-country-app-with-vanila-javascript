const DOM = (function(){
    'use strict'
    
    const   searchBox = document.querySelector(".searchBox"),
            submitBtn = document.querySelector(".submitBtn"),
            resultContainer = document.querySelector(".result-container"),

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
                                                <div class="result-text" id="total deaths">
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
                } else {
                    alert ("show only 2 countries");
                }
            },

            removeCountryCard = function(event){
                const thisResult = event.parentElement.parentElement;

                resultContainer.removeChild(thisResult);
            },

            generateCompareText = function(array){
                if (resultContainer.childElementCount === 2) {
                    
                }
            } 

    return  {
                searchBox:searchBox,
                submitBtn:submitBtn,
                createCountryCard:createCountryCard,
                removeCountryCard:removeCountryCard
            }

})();

