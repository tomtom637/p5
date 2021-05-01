const cartNum = document.getElementById('cart-num');

const getCartLength = () => JSON.parse(localStorage.getItem('cart')).length;

//! INITIALIZATION
function initializeCart() {
  if(localStorage.getItem('cart')) return;

  localStorage.setItem(
    'cart',
    JSON.stringify([])
  );

  cartNum.textContent = getCartLength();
}

initializeCart();

//! ADDING TO CART
function addToCart(item) {
  const originalContent = JSON.parse(localStorage.getItem('cart'));

  localStorage.setItem(
    'cart',
    JSON.stringify([...originalContent, item])
  );

  cartNum.textContent = getCartLength();
}

//! REMOVING ALL OF A KIND FROM CART
function removeFromCart(item) {
  const originalContent = JSON.parse(localStorage.getItem('cart'));

  const updatedContent = originalContent.filter(items => items !== item);

  localStorage.setItem(
    'cart',
    JSON.stringify(updatedContent)
  );

  cartNum.textContent = getCartLength();
}

//! REMOVING ONE OF A KIND FROM CART
function removeOneFromCart(item) {
  const cartContent = JSON.parse(localStorage.getItem('cart'));

  cartContent.splice(cartContent.indexOf(item), 1);

  localStorage.setItem(
    'cart',
    JSON.stringify(cartContent)
  );

  cartNum.textContent = getCartLength();
}

//! EMPTYING CART
function emptyCart() {
  localStorage.setItem(
    'cart',
    JSON.stringify([])
  );

  cartNum.textContent = getCartLength();
}