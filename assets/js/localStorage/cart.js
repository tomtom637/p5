class Cart {
  constructor() {
    this.counterElement = document.getElementById('cart-num');
    this.initialize();
  }
  // UPDATE THE CART COUNTER VIEW
  updateCounter() {
    this.counterElement.textContent = JSON.parse(localStorage.getItem('cart')).length;
  }
  // INITIALIZATION OF THE CART
  initialize() {
    if(localStorage.getItem('cart')) return;
    localStorage.setItem(
      'cart',
      JSON.stringify([])
    );
    this.updateCounter();
  }
  // GET ITEMS FROM CART
  getItems() {
    return JSON.parse(localStorage.getItem('cart'));
  }
  // ADD ITEM TO CART
  addItem(item) {
    const originalContent = JSON.parse(localStorage.getItem('cart'));
    localStorage.setItem(
      'cart',
      JSON.stringify([...originalContent, item])
    );
    this.updateCounter();
  }
  // REMOVING ALL OF A KIND FROM CART
  removeItemType(item) {
    const originalContent = JSON.parse(localStorage.getItem('cart'));
    const updatedContent = originalContent.filter(items => items !== item);
    localStorage.setItem(
      'cart',
      JSON.stringify(updatedContent)
    );
    this.updateCounter();
  }
  // REMOVING ONE OF A KIND FROM CART
  removeOne(item) {
    const cartContent = JSON.parse(localStorage.getItem('cart'));
    cartContent.splice(cartContent.indexOf(item), 1);
    localStorage.setItem(
      'cart',
      JSON.stringify(cartContent)
    );
    this.updateCounter();
  }
  // EMPTYING THE CART
  emptyOut() {
    localStorage.setItem(
      'cart',
      JSON.stringify([])
    );
    this.updateCounter();
  }
}

const cart = new Cart();

export default cart;