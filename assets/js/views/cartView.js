// RENDERS THE CART NUMBER
cart.updateCounter();


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

// THE TEMPLATE
function renderCartItemsTemplate(itemsData) {
  return (
    /*html*/`    
      <p>coucou</p>
    `
    );
}

async function renderCartItems() {
  const cartContainer = document.getElementById('cart-page-container');
  if(cart.getItems().length === 0) {
    cartContainer.innerHTML = renderEmptyCart();
    return;
  }
  const fetchedItems = await fetcher.fetchSomeItems(cart.getItems());
  cartContainer.innerHTML = renderCartItemsTemplate(fetchedItems);
}

renderCartItems();
