var countryList = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];


// Onreload
window.addEventListener("load", function(){
    listCountry.style.display = "none";
})

const listCountry = document.querySelector(".list");
const inputCountry = document.querySelector("#inputCountry");
let count = 0;
let newArry = [];

inputCountry.addEventListener("focus", function(){
    listCountry.style.display = "block";
    inputCountry.addEventListener("keyup", function(e){
        if(e.key == "Backspace"){
            newArry.pop()
        }else if(e.key == "inter"){
            newArry = [];
        }
        else{
            newArry.push(e.key)
        }

        let convartString = newArry.join("");
        listCountry.innerHTML = ""

        for(let i = 0; i < countryList.length; i++){
            if(countryList[i].toLowerCase().startsWith(convartString[0].toLowerCase()) && countryList[i].toLowerCase().includes(convartString.toLowerCase())){
                let li = document.createElement("li");
                li.innerHTML = countryList[i]
                listCountry.appendChild(li);
                liAddInputSection(li);
            }
        }
    })
    for(let item of countryList){
        let li = document.createElement("li");
        li.innerHTML = item;
        listCountry.appendChild(li);
        liAddInputSection(li);
    }
})

function liAddInputSection(li){
    li.addEventListener("click", function(){
        inputCountry.value = li.innerHTML;
        listCountry.style.display = "none"
    })
}

// input Unfocus
inputCountry.addEventListener("focusout", function(){
    newArry = [];
})