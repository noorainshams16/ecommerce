let cart = document.querySelector(".cart");

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    // REMOVE BUTTON 
    var removeCartButtons = document.getElementsByClassName("fa-trash");
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    // ADD QUANTITY
    var quantityInput = document.getElementsByClassName("box-quantity");
    for (var i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i];
        input.addEventListener("change", quantityChange);
    }

    var addCart = document.getElementsByClassName("fa-cart-shopping");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClick);
    }
    loadCartItems();

    document
    .getElementsByClassName("buy-btn")[0]
    .addEventListener("click", buyButtonClicked);
}

// FUNCTION TO BUY
function buyButtonClicked(){
    alert("Your Order is Placed");
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
}

// FUNCTION TO REMOVE
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    cartTotal();
    saveCartItems();
}

// FUNCTION TO CHANGE QUANTITY
function quantityChange(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    cartTotal();
    saveCartItems();
}


// FUNCTION TO ADD CART
function addCartClick(event) {
    var button = event.target;
    var shopProduct = button.parentElement;
    var title = shopProduct.getElementsByClassName("product-title")[0].innerText;
    var price = shopProduct.getElementsByClassName("product-price")[0].innerText;
    var productImg = shopProduct.getElementsByClassName("product-img")[0].src;

    addProductToCart(title, price, productImg);
    cartTotal();
    saveCartItems();
}

function addProductToCart(title, price, productImg) {
    const cartContent = document.querySelector(".cart-content");
    const cartItemsTitles = cartContent.querySelectorAll(".box-title");
    for (const itemTitle of cartItemsTitles) {
        if (itemTitle.textContent.trim() === title.trim()) {
            alert("you have already added.");
            return;
        }
    }

    const cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");

    var cartBoxContent = `
                          <img src="${productImg}" class="cart-img">
                          <div class="box-detail">
                            <div class="box-title">${title}</div>
                            <div class="box-price">${price}</div>
                          <input type="number" value="1" class="box-quantity">
                          </div>
                          <i class="fa-solid fa-trash"></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartContent.append(cartShopBox);
    cartShopBox
        .getElementsByClassName("fa-trash")[0]
        .addEventListener("click", removeCartItem);
    cartShopBox
        .getElementsByClassName("box-quantity")[0]
        .addEventListener("change", quantityChange);
    saveCartItems();
}

// TOTAL PRICE OF CART
function cartTotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var elementPrice = cartBox.getElementsByClassName("box-price")[0];
        var totalPrice = parseFloat(elementPrice.innerText.replace("P","").trim());
        var elementQuantity = cartBox.getElementsByClassName("box-quantity")[0];
        var totalQuantity = elementQuantity.value;
        total = total + totalPrice * totalQuantity;
    }
        total = Math.round (total*100)/100;

        document.getElementsByClassName("total-price")[0].innerText = "P" + total;

        localStorage.setItem("cartTotal", total);
}

function saveCartItems() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = document.getElementsByClassName("cart-box");
    var CartItems = [];

    for (var i=0; i < cartBoxes.length; i++) {
        cartBox = cartBoxes[i];
        var titleElement = cartBox.getElementsByClassName("box-title")[0];
        var elementPrice = cartBox.getElementsByClassName("box-price")[0];
        var elementQuantity = cartBox.getElementsByClassName("box-quantity")[0];
        var productImg = cartBox.getElementsByClassName("cart-img")[0].src;

        var item = {
            title: titleElement.innerText,
            price: elementPrice.innerText,
            quantity: elementQuantity.value,
            productImg: productImg,
        };
        CartItems.push(item);
    }
    localStorage.setItem("cartItems", JSON.stringify(CartItems));
}

function loadCartItems() {
    var cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
        cartItems = JSON.parse(cartItems);

        for (var i=0; i < cartItems.length; i++) {
            var item = cartItems[i];
            addProductToCart(item.title, item.price, item.productImg);

            var cartBoxes = document.getElementsByClassName("cart-box");
            var cartBox = cartBoxes[cartBoxes.length - 1];
            var elementQuantity = cartBox.getElementsByClassName("box-quantity")[0];
            elementQuantity.value = item.quantity;
        }
    }
    var cartTotal = localStorage.getItem("cartTotal");
    if(cartTotal) {
        document.getElementsByClassName("total-price")[0].innerText = "P" + cartTotal;
    }
}


