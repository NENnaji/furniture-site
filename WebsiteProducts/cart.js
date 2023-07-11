if (document.readyState == 'loading') { // makes sure the js runs after the page is loaded
    document.addEventListener('DOMContentLoaded', ready)
} else {
    pageLoaded()
}

function pageLoaded() {
    onLoadCartAmount()
    displayCart()
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
        button.addEventListener('click', cartAmount)
        button.addEventListener('click', addToCartClicked)
    }


    //once user presses PURCHASE
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

//will get the cartAmount from local storage and up date the the cart span when ever you swap pages
function onLoadCartAmount(){
    let productAmount = localStorage.getItem('cartAmount')
    if(productAmount){
        document.querySelector('.cart span').textContent = productAmount
    }
}

//keeps track of ho many times you update the cart
function cartAmount(){
    let productAmount = localStorage.getItem('cartAmount')
    productAmount = parseInt(productAmount)
    if(productAmount){ //will be true if there already exists a cartAmount key in local stroage
        localStorage.setItem('cartAmount', productAmount + 1)
        document.querySelector('.cart span').textContent = productAmount + 1 //increase cartAmount by one
    }else{
        localStorage.setItem('cartAmount', 1) //creates cartAmount if there deosint already exist one
        document.querySelector('.cart span').textContent = 1
    }
}


function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()//removes cart-row form the cart
    updateCartTotal()
}

//is suposed to grab the html from the cart.html and update the total based off that information
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]//is the array of all the cart items
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    var price //will eventualy store a string without $ or , so it can be read as a number to update total
    var quantity//the amount of the same item that exists
    var priceElement
    var quantityElement

    for (var i = 0; i < cartRows.length; i++) { // will go through each cart row and add up the price of each item and set it equal to total
        priceElement = cartRows[i].getElementsByClassName('cart-price')[0]
        quantityElement = cartRows[i].getElementsByClassName('cart-quantity-input')[0]
        price = parseFloat(priceElement.innerText.replace(',', '').replace('$', ''))
        quantity = quantityElement.value
        total = total + (Number(price) * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}


function addToCartClicked(event) { //gets all the information of the item clicked and sends it to addItemToCart
    var button = event.target;
    var cartItem = button.parentElement.parentElement;
    var name = cartItem.getElementsByClassName('p-name')[0].innerText;
    var price = cartItem.getElementsByClassName('p-price')[0].innerText;
    var imageSrc = cartItem.getElementsByClassName('p-image')[0].src;
    addItemToCart(name, price, imageSrc);
}

//gets called when ever a page gets loaded
function displayCart(){
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    let productsBox = document.querySelector(".cart-items")
    if(cartItems && productsBox){//this check is to make sure that were on the right page so that we load the cart only on cart.html
        productsBox.innerHTML = ''
        Object.values(cartItems).map(item =>{//goes through the cartItems and adds them to the "cart-items" innerHTML
            productsBox.innerHTML += `
            <div class="cart-item cart-column">
            <span class="cart-item-title">${item[0].name}</span>
        </div>
        <span class="cart-price cart-column">${item[0].price}</span>
        <div class="cart-quantity cart-column">
            <span class="cart-quantity-input">${item[0].inCart}</span>
            <button class="btn btn-remove" type="button">REMOVE</button>
        </div>`
        })
        updateCartTotal()
    }
}
//uploads the infromation to the database localy
function addItemToCart(name, price, imageSrc) {
    let product =[{//format for how the information is stored localy
        name: name,
        price: price,
        inCart: 0
    }
    ];

    let cartItems = localStorage.getItem('productsInCart')
    
    cartItems = JSON.parse(cartItems)//converts the cartItems to a string

    //will check weather it has to add a new item to the database or just incrament inCart by one
    if(cartItems != null){
        if(cartItems[name] == undefined){
            cartItems = {
                ...cartItems,
                [name]: product
            }
        }
        cartItems[name][0].inCart += 1
    }
    else{
        cartItems = {
            [name]: product
        }
        cartItems[name][0].inCart += 1
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
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
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}