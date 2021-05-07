import cart from '../localStorage/cart.js';
import fetcher from '../requests/fetcher.js';

// RENDERS THE CART NUMBER
cart.updateCounter();

window.updateQuantity = element => {
  const id = element.dataset.id;
  const articleElement = document.getElementById('cart-article' + id);
  const priceElement = document.getElementById('price' + id);
  const quantityElement = document.getElementById('cart-quantity' + id);
  let price = articleElement.dataset.price;
  let quantity = articleElement.dataset.quantity;
  if(element.dataset.action === 'arrow-down') {
    cart.removeOne(element.dataset.id);
    --quantity;
  }
  if(element.dataset.action === 'arrow-up') {
    cart.addItem(element.dataset.id);
    ++quantity;
  }
  if(element.dataset.action === 'remove-item') {
    cart.removeItemType(element.dataset.id);
    quantity = 0;
  }
  articleElement.dataset.quantity = quantity;
  articleElement.dataset.price = price;
  if(quantity === 0) articleElement.style.display = "none";
  priceElement.innerText = `$ ${price * quantity / 100}`;
  quantityElement.innerText = `Quantity - ${quantity}`;
  if(cart.getItems().length === 0) {
    document.getElementById('section-cart-items').innerHTML = renderEmptyCart();
  }
}

// EMPTY CART TEMPLATE
function renderEmptyCart() {
  return (
    /*html*/`
      <section class="section-empty-cart">
        <p class="section-empty-cart__p">
          Your cart is empty 😢...
          <br />
          <a class="section-empty-cart__link" href="/">Go fill it with joy 😊!</a>
        </p>
        <div class="section-empty-cart__illustration">
          <img class="section-empty-cart__teddy" src="assets/img/teddy.svg" alt="teddies are wonderfull">
        </div>
      </section>
    `
  );
}

// CART ITEM TEMPLATE
function renderCartItemTemplate(itemData, quantity) {
  const { _id, name, price, imageUrl } = itemData;
  return (
    /*html*/`    
      <article
        id="cart-article${_id}"
        data-id=${_id}
        data-price=${price}
        data-quantity=${quantity}
        class="section-cart-items__article">
        <img class="section-cart-items__img" src=${imageUrl} alt="Orinoco Teddies ${name}" />
        <h2 class="section-cart-items__name name">${name}</h2>
        <div class="section-cart-items__quantity">
          <span id="cart-quantity${_id}" class="section-cart-items__quantity-text">Quantity - ${quantity}</span>
          <div class="section-cart-items__quantity-arrows">
            <img
              class="section-cart-items__quantity-arrow-down"
              data-id=${_id}
              data-action="arrow-down"
              src="./assets/img/arrow-down.svg"
              alt="remove one"
              onclick="updateQuantity(this)"
            >
            <img
              class="section-cart-items__quantity-arrow-up"
              data-id=${_id}
              data-action="arrow-up"
              src="./assets/img/arrow-up.svg"
              alt="add one more"
              onclick="updateQuantity(this)"
            >
          </div>
        </div>
        <div
          class="section-cart-items__remove-container"
          data-id=${_id}
          data-action="remove-item"
          onclick="updateQuantity(this)"
        >
          <span class="section-cart-items__remove-text">Remove</span>
          <img class="section-cart-items__remove-cross" src="./assets/img/times.svg" alt="remove this item">
        </div>
        <span id="price${_id}" class="section-cart-items__price price">
          $ ${price * quantity / 100}
        </span>
      </article>
    `
    );
}

async function renderCartItems() {
  const cartContainer = document.getElementById('section-cart-items');
  cartContainer.innerHTML = '';
  // RENDERS EMPTY CART  
  if(cart.getItems().length === 0) {
    cartContainer.innerHTML = renderEmptyCart();
    return;
  }
  // RENDERS CART ITEMS
  const fetchedItems = await fetcher.fetchSomeItems(cart.getItems());
  fetchedItems.forEach(fetchedItem => {
    const quantity = cart
      .getItems()
      .filter(cartItem => cartItem === fetchedItem._id)
      .length;
    cartContainer.innerHTML += renderCartItemTemplate(fetchedItem, quantity);
  });
}

renderCartItems();
