const DOM = (function(){
    'use strict'
    
    const   searchBox = document.querySelector("#searchBox"),
            submitBtn = document.querySelector("#submitBtn");

    return  {
                searchBox:searchBox,
                submitBtn:submitBtn
            }

})();