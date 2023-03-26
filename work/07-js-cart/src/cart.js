"use strict";

export const cart = [
    { name: 'Big White', src: 'http://placekitten.com/50/50?image=1', price: '0.99', quantity: '0' },
    { name: 'Medium Grey', src: 'http://placekitten.com/50/50?image=2', price: '3.14', quantity: '0' },
    { name: 'Little Black', src: 'http://placekitten.com/50/50?image=3', price: '2.73', quantity: '0' }
];
const cartElement = document.querySelector('.cart');

export function renderCart() {

    const cartHtml = cart.map((item, index) => {
            const displayClass = item.quantity <= 0 ? "not-displayed" : "";
            return `
            <li class="item ${displayClass}">
                <img src="${item.src}" alt="${item.name}">
                <div class="item-name">${item.name}</div>
                <div class="item-price">$${item.price}</div>
                <div class="item-quant">${item.quantity}</div>
                <div class="item-totalprice">$${(item.price*item.quantity).toFixed(2)}</div>
                <button class="item-minusbutton" data-index="${index}">-</button>
                <button class="item-addbutton" data-index="${index}">+</button>
            </li>
        `;
        }
    ).join('');

    cartElement.innerHTML = cartHtml;

    const cartMessage = document.querySelector('.cart-message');
    const cartTotalprice = document.querySelector('.cart-totalprice');
    const checkoutButton = document.querySelector('.button-checkout');

    let isAllZero = true;
    let totalPrice = 0;
    for (const item of cart) {
        if (item.quantity > 0) {
            isAllZero = false;
            totalPrice += item.price*item.quantity;
        }
    }

    if (isAllZero) {
        cartMessage.innerHTML = "Nothing in the cart";
        cartTotalprice.innerHTML = "0";
        checkoutButton.classList.add('not-displayed');
    } else {
        cartMessage.innerHTML = "";
        cartTotalprice.innerHTML = `Total Price: $${totalPrice.toFixed(2)}`;
        checkoutButton.classList.remove('not-displayed');
    }

}

renderCart();

cartElement.addEventListener('click', (e) => {
    if (e.target.classList.contains('item-minusbutton')) {
        const cartIndex = e.target.dataset.index;
        if (cart[cartIndex].quantity > 0) {
            cart[cartIndex].quantity--;
        }
        renderCart();
    }
    if (e.target.classList.contains('item-addbutton')) {
        const cartIndex = e.target.dataset.index;
        cart[cartIndex].quantity++;
        renderCart();
    }
});

const viewButton = document.querySelector('.button-viewcart');
const hideButton = document.querySelector('.button-hidecart');
const cartframe = document.querySelector('.cartframe');

viewButton.addEventListener('click', () => {
    cartframe.classList.remove('not-displayed');
    viewButton.classList.add('not-displayed');
});
hideButton.addEventListener('click', () => {
    cartframe.classList.add('not-displayed');
    viewButton.classList.remove('not-displayed');
});

const checkout = document.querySelector('.button-checkout');

checkout.addEventListener('click',()=>{
    update();
})

function update(){
    cartframe.classList.add('not-displayed');
    viewButton.classList.remove('not-displayed');
    for (const item of cart) {
        item.quantity = 0;
    }
    renderCart();
}