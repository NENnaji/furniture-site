if (document.readyState == 'loading') { // makes sure the js runs after the page is loaded
    document.addEventListener('DOMContentLoaded', ready)
} else {
    pageLoaded()
}

function pageLoaded() {
    //this part is used when the user wants to remove a specific item form the cart
    var removeCartItemButtons = document.getElementsByClassName('btn-remove')
    var button;
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    //this part is used when the user adds or removes an item form the cart the cart-total-price needs to be updated
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    var input;
    for (var i = 0; i < quantityInputs.length; i++) {
        input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    //this part is used when the user clicks ADD TO CART
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    var button;
    for (var i = 0; i < addToCartButtons.length; i++) {
        button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    //once user presses PURCHASE
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()//removes cart-row form the cart
    updateCartTotal()
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0 //end result that cart-total-price will be set too
    var priceElement;//stores the string of price
    var quantityElement;
    var price;//stores the converted value of priceElement as an int
    var quantity;//the amount of the same item that exits in the cart

    for (var i = 0; i < cartRows.length; i++) { // will go through each cart row and add up the price of each item and set it equal to total
        priceElement = cartRows[i].getElementsByClassName('cart-price')[0]
        quantityElement = cartRows[i].getElementsByClassName('cart-quantity-input')[0]
        price = parseFloat(priceElement.innerText.replace(',', '').replace('$', ''))
        quantity = quantityElement.value
        total = total + (Number(price) * quantity)
    }
    total = Math.round(total * 100) / 100 // rounds the number to the second decimal place
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

function addToCartClicked(event) { //gets all the information of the item clicked and sends it to addItemToCart
    var button = event.target;
    var cartItem = button.parentElement.parentElement;
    var name = cartItem.getElementsByClassName('p-name')[0].innerText;
    var price = cartItem.getElementsByClassName('p-price')[0].innerText;
    var imageSrc = cartItem.getElementsByClassName('p-image')[0].src;
    addItemToCart(name, price, imageSrc);
    updateCartTotal();
}

function addItemToCart(name, price, imageSrc) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (var i = 0; i < cartItemNames.length; i++) { //for checking if the item is already in the cart. If so it wont add it
        if (cartItemNames[i].innerText == name) {
            alert("already in cart");
            return
        }
    }
    //adding the new item to the cart
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100">
            <span class="cart-item-title">${name}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-remove" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {// makes sure that the quantity is not zero or below and that it is a number
        input.value = 1
    }
    updateCartTotal()
}

function purchaseClicked() {//just deletes everything from the cart for now
    alert('Your Purchase was Successful :)')

    storePurchaseData();
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}


// CREATE A XMLHTTPREQUEST OBJECT CONTAINING JSON INFORMATION ABOUT PRODUCT NAME, QUANTITY, TOTAL COST
// SEND TO PHP FILE FOR PROCESSING AND STORING ON DATABASE,
function storePurchaseData() {

    var cartInformation = [];


    var cartItems = document.getElementsByClassName('cart-item-title');
    var quantity = document.getElementsByClassName('cart-quantity-input');
    var price = document.getElementsByClassName('cart-price');


    for (let i = 0; i < cartItems.length; i++) {
        // console.log(cartItems[i].innerText, quantity[i].value, price[i + 1].innerText);
        var itemPrice = price[i + 1].innerText;
        itemPrice = itemPrice.replace('$', '');
        itemPrice = itemPrice.replace(',', '');
        cartInformation.push({name: cartItems[i].innerText, quantity: quantity[i].value, price: itemPrice});
    }


    let jsonCart = JSON.stringify(cartInformation);

    console.log(jsonCart);

    let xhr = new XMLHttpRequest();

    xhr.addEventListener("load", function() {

        if (this.status === 200) {

            console.log("SUCCESSFUL HELLO WORLD");
            console.log((this.response));
        }

    })

    xhr.open("POST", "jsonHandler.php", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonCart);

}

