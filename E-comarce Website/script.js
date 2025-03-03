
// Banner slider start
const bannerImg = document.querySelector(".banner-img");
const images = document.querySelectorAll(".banner-img img");
let count = 0;

function autoSlider(){
    setInterval(function(){
        images[count].style.animation = 'next1 0.3s forwards';
        if(count == images.length - 1){
            count = 0
        }else{
            count++
        }
        images[count].style.animation = 'next2 0.3s forwards';
    }, 4000);
}
autoSlider()
// Banner slider end

// Hiddenbar click event start
const barIcon = document.querySelector(".barIcon");
const crossIcon = document.querySelector(".crossIcon");
const activeBox = document.querySelector(".active-box");

if(barIcon){
    barIcon.addEventListener("click", function(){
        activeBox.classList.add("active");
        barIcon.classList.remove("ButtonActive");
        crossIcon.classList.add("ButtonActive");
    })
}
if(crossIcon){
    crossIcon.addEventListener("click", function(){
        activeBox.classList.remove("active");
        barIcon.classList.add("ButtonActive");
        crossIcon.classList.remove("ButtonActive");
    })
}
// Hiddenbar click event end

// Features area start
const featuresArea = document.querySelector(".features-area");
const fbarIcon = document.querySelector(".FbarIcon");
let fSymbol = true;

fbarIcon.addEventListener("click", function(){
    if(fSymbol){
        featuresArea.classList.add("active");
        fSymbol = false;
    }else{
        featuresArea.classList.remove("active")
        fSymbol = true;
    }
})
// Features area end

// Sarch product start
// Enithilize value
const productsBox = document.querySelector(".product-box");
import { products } from './data.js';

// Sarch for option
const pButton = document.querySelectorAll(".products-detals button");

// list div create 
function listDivFun(){
    for(let data of products.data){
        let div = document.createElement("div");
        div.className = "list";
        div.id = data.id;
        let img = document.createElement("img");
        img.src = data.img;
        let att = document.createAttribute("onclick");
        att.value = "window.location.href='sProduct.html'"
        img.setAttributeNode(att)
        let newdiv = document.createElement("div");
        newdiv.className = "text";
        let h5 = document.createElement("h5");
        h5.innerHTML = data.productName;
        newdiv.appendChild(h5);
        let ptag = document.createElement("p");
        ptag.innerHTML = data.price
        let h4tag = document.createElement("h4");
        h4tag.innerHTML = data.discount
        let atag = document.createElement("a");
        atag.className = "productsBtn";
        atag.innerHTML = "Add to Cart";
        div.appendChild(img)
        div.appendChild(newdiv)
        div.appendChild(ptag)
        div.appendChild(h4tag)
        div.appendChild(atag)

        productsBox.appendChild(div);
    }
}

// alltime add products
listDivFun()
// button select
for(let i = 0; i < pButton.length; i++){

    pButton[i].addEventListener("click", function(){
        const notFoundBox = document.querySelector(".notFund-area");
        notFoundBox.style.display = "none";

        pButton.forEach((a)=> a.className = "");
        pButton[i].classList.add("active");

        let productName = document.querySelectorAll(".list .text h5");

        if(pButton[i].innerHTML.toUpperCase() === "ALL"){
            productName.forEach((product)=> {
                let list = product.parentElement.parentElement;

                list.classList.remove("hide")
            })
        }else{
            let Buttonvalue = pButton[i].innerHTML.toLowerCase();

            productName.forEach((product)=> {
                let pName = product.innerHTML.toLowerCase();
                let list = product.parentElement.parentElement;

                if(pName.includes(Buttonvalue)){
                    list.classList.remove("hide")
                }else{
                    list.classList.add("hide")
                }
            })
        }
    })
}
// Sarch product start

// Input sarch product start
const submitForm = document.querySelector(".sarch");
const inputBox = document.querySelector(".sarch #input");
const productSubmit = document.querySelector(".serch-box #submit");

submitForm.addEventListener("submit", addProducts);
productSubmit.addEventListener("click", addProducts);

function addProducts(){
    let value = inputBox.value;

    let products = document.querySelectorAll(".list .text h5");
    products.forEach((product)=> {
        let productName = product.innerHTML.toUpperCase();
        let inclueds = productName.includes(value.toUpperCase())
        let list = product.parentElement.parentElement;
        

        if(!inclueds){
            list.classList.add("hide");
            
        }else{
            list.classList.remove("hide");
        }
    })
    
    // if this sarch product is not found then
    const notFoundBox = document.querySelector(".notFund-area");
    let hide = document.querySelectorAll(".products-box .hide");
    let list = document.querySelectorAll(".products-box .list")

    if(hide.length == list.length){
        notFoundBox.style.display = "block";
    }else{
        notFoundBox.style.display = "none";
    }
    
    // Default value
    if(pButton[0].className != "active"){
        pButton.forEach((a)=> a.className = "")
        pButton[0].classList.add("active");
    }
    inputBox.value = " "

}
// Input sarch product end


// Input placeholder sliding start
const placeholder = document.querySelectorAll(".placeholder");
let pCount = 0;
let setIntervalPlaceholder;

function placeholderFun(){
    setIntervalPlaceholder = setInterval(function(){
    placeholder[pCount].style.animation = "upDown1 0.3s forwards";
    pCount++;
    if(pCount == placeholder.length){
        pCount = 0;
    }
    placeholder[pCount].style.animation = "upDown2 0.3s forwards";
}, 3000)
}
placeholderFun()

// focus in input
inputBox.addEventListener("focus", function(){
    placeholder.forEach((a)=> {
        a.style.display = "none"
    })
    clearInterval(setIntervalPlaceholder)
})
// focus out input
inputBox.addEventListener("focusout", function(){
    if(inputBox.value.length == 0){
        placeholder.forEach((a)=> {
            a.style.display = "block"
        })
        placeholderFun()
    }
})
// Input placeholder sliding end


// Add cart button
const productsBtn = document.querySelectorAll(".product-box .list a");
const notification = document.querySelector(".notification");
let productCount = 0;

for(let i = 0; i < productsBtn.length; i++){
    productsBtn[i].addEventListener("click", ()=> {
        productsBtn[i].style.background = "black"
        productsBtn[i].innerHTML = '<i class="fa-solid fa-check"></i>'

        // for add this product in cart box
        productCount++;
        if(productCount >= 1){
            notification.classList.add("active");
        }
        notification.innerHTML = `<h2>${productCount}</h2>`;

        let img = productsBtn[i].parentElement.children[0].src;
        let productName = productsBtn[i].parentElement.children[1].children[0].innerHTML;
        let price = productsBtn[i].parentElement.children[2].innerHTML;

        makeProductDiv(img, productName, price);

        buyNowFun()
    })
}

// inishialize value
const cartProducts = document.querySelector(".cart-products");
const cartProductsShow = document.querySelector(".for-cart");
let totalPrice = 0;

function makeProductDiv(img, productName, price){

    let div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
        <img src="${img}" alt="">
        <div class="content">
        <h2>${productName}</h2>
        <div class="text">
            <h3>${price}</h3>
            <div class="counter">
                <button class="mainus">-</button>
                <h3>1</h3>
                <button class="plus">+</button>
            </div>
        </div>
        </div>
        <i class="removeElelemt fa-solid fa-x"></i>
    `;
    cartProducts.appendChild(div);
    
    // for remove cart Product
    const removeElelemt = document.querySelectorAll(".removeElelemt");
    clickRemoveIconFun(removeElelemt)

    // plus and mainus product
    const mainusValue = document.querySelectorAll(".mainus");
    const plusValue = document.querySelectorAll(".plus");
    plusAndMainusFun(mainusValue, plusValue);

    // Total price show in cart
    let totalPriceArry = price.split("");
    totalPriceArry.shift();
    totalPrice += parseFloat(totalPriceArry.join(""));

    let newDiv = document.createElement("div");
    newDiv.classList.add("total");

    totalDollar(newDiv, totalPrice);

    if(newDiv.previousElementSibling.classList == "total"){
        newDiv.previousElementSibling.remove();
    }
}

// Plus and maiNus product

function plusAndMainusFun(mainusValue, plusValue){
    // Convert just 1 value
    let newMainusValue = mainusValue[mainusValue.length - 1];
    let newPlusValue = plusValue[plusValue.length - 1];

    // Price element
    let elementOfPrice = newMainusValue.parentElement.previousElementSibling;

    // Need product count
    let counterElement = newMainusValue.nextElementSibling;
    let counterElementleft = newPlusValue.previousElementSibling;
    let howmanyNedd = 1;

    // Convert price array to string
    let priceArr = elementOfPrice.innerHTML.split("");
    priceArr.shift();

    // price convert string to number
    let mainPrice = parseFloat(priceArr.join(""));

    // plus minus
    let elementTotal = mainPrice;

    // start minus and plus through click
    newMainusValue.addEventListener("click", ()=> {
        if(mainPrice < elementTotal){
            elementTotal -= mainPrice;
            totalPrice -= mainPrice;
            howmanyNedd--;
        }
        elementOfPrice.innerHTML = '$' + elementTotal;
        counterElement.innerHTML = howmanyNedd;

        // inishial total dollar element
        newTotalvalueAdd()

    })
    newPlusValue.addEventListener("click", ()=> {
        elementTotal += mainPrice;
        totalPrice += mainPrice;
        howmanyNedd++;

        elementOfPrice.innerHTML = '$' + elementTotal;
        counterElement.innerHTML = howmanyNedd;
        // inishial total dollar element
        newTotalvalueAdd()
    })

}

// create total doller
function totalDollar(div, price){
    let newDiv = div;

    newDiv.innerHTML = `
        <button class="buyNow">Buy Now</button>
        <div class="text">
            <label for="#">Total:</label>
            <h4 class="totalDollar">$${price}</h4>
        </div>
    `;
    cartProductsShow.appendChild(newDiv)

    
}


// click cart Button
const cartProduts = document.querySelector(".cartProduts");
const productsChek = cartProductsShow.querySelector(".cart-products");
const cartItems = document.querySelectorAll(".cart-items");
let chekSymbol = true;

// Cheaking cart
cartProduts.addEventListener("click", ()=> {
    cartItems.forEach((val)=> val.classList.remove("active"))
    if(chekSymbol && productsChek.children.length >= 1){
        cartProductsShow.classList.add("active")
        chekSymbol = false;
    }else if(productsChek.children.length == 0){
        alert("Sorry! Here are not any products")
        cartProductsShow.classList.remove("active")
        chekSymbol = true;
    }else{
        cartProductsShow.classList.remove("active")
        chekSymbol = true;
    }
})


// remove cart Product
function clickRemoveIconFun(val){

    let element = val[val.length - 1]
    element.addEventListener("click", ()=> {

        let parent = element.parentElement;
        parent.remove()
        productCount--;
        notification.innerHTML = `<h2>${productCount}</h2>`;
        
        let minusProduct = parent.children[0].src;
        for(let i = 0; i < productsBtn.length; i++){
            let mainProduct = productsBtn[i].parentElement;
            if(mainProduct.children[0].src == minusProduct){
                let element = mainProduct.children[4];

                element.style.background = "linear-gradient(90deg, rgba(187,96,47,1) 20%, rgba(210,72,30,1) 68%)";
                element.innerHTML = "Add to Cart";
                
            }
        }

        if(productCount == 0){
            cartProductsShow.classList.remove("active")
            chekSymbol = true;
            notification.classList.remove("active");
            console.log("hi")
        }

        // remove minus value in total
        // for get mainus product price
        let price = parent.children[1].children[1].children[0].innerHTML.split("");
        price.shift()
        let mainPriceInProduct = parseFloat(price.join(""))

        totalPrice -= mainPriceInProduct;
        
        newTotalvalueAdd()
    })
}


// Total value add Function
function newTotalvalueAdd(){
    const totalElementFromCart = document.querySelector(".totalDollar");
    totalElementFromCart.innerHTML = `<h4 class="totalDollar">$${totalPrice}</h4>`;
}

// Click buy now
function buyNowFun(){
    const buyNow = document.querySelector(".buyNow");
    buyNow.addEventListener("click", ()=> {
        alert(`Congratulation your products successfully ordered now`);
        cartProductsShow.classList.remove("active")
        chekSymbol = true;
    })
}

// Cart features
const items = document.querySelectorAll(".items");
let itemCheking = true;

items.forEach((val, num)=> {
    val.addEventListener("click", ()=> {
        cartProductsShow.classList.remove("active")
        chekSymbol = true;
        
        if(itemCheking){
            cartItems.forEach((a)=> {
                a.classList.remove("active")
            })
            cartItems[num].classList.add("active");
            itemCheking = false;
        }else{
            cartItems[num].classList.remove("active");
            itemCheking = true;
        }
    })
})


