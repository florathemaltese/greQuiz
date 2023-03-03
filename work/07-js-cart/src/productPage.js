"use strict";

import { cart, renderCart } from "./cart";

const products = [
    { name: 'Big White', src: 'http://placekitten.com/150/150?image=1', price: '0.99' },
    { name: 'Medium Grey', src: 'http://placekitten.com/150/150?image=2', price: '3.14' },
    { name: 'Little Black', src: 'http://placekitten.com/150/150?image=3', price: '2.73' }
];
const productsEl = document.querySelector('.products');

function renderProducts() {
    const productHtml = products.map((product, index) => `
            <li class="product">
                <img src="${product.src}" alt="${product.name}">
                <div class="product-name">${product.name}</div>
                <div class="product-price">$${product.price}</div>
                <button class="product-addbutton" data-index="${index}">Add to Cart</button>
            </li>
        `).join('');

    productsEl.innerHTML = productHtml;
}
renderProducts();

productsEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('product-addbutton')) {
        const productIndex = e.target.dataset.index;
        cart[productIndex].quantity++;
        renderCart();
    }
});