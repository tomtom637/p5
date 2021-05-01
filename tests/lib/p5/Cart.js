class Cart {
  constructor() {
    this.storage = {};
    this.initialize();
  }

  // UPDATE THE CART COUNTER VIEW
  updateCounter() {
    this.counter = this.storage.items.length;
  }

  // INITIALIZATION OF THE CART
  initialize() {
    if(this.storage.items) return;

    this.storage.items = [];
    this.updateCounter();
  }

  // ADD ITEM TO CART
  addItem(item) {
    const originalContent = this.storage.items;
    this.storage.items =  [...originalContent, item];
    this.updateCounter();
  }

  // REMOVING ALL OF A KIND FROM CART
  removeItemType(item) {
    const originalContent = this.storage.items;
    const updatedContent = originalContent.filter(items => items !== item);
    this.storage.items = updatedContent;
    this.updateCounter();
  }

  // REMOVING ONE OF A KIND FROM CART
  removeOne(item) {
    const cartContent = this.storage.items;
    cartContent.splice(cartContent.indexOf(item), 1);
    this.storage.items = cartContent;
    this.updateCounter();
  }

  // EMPTYING THE CART
  emptyOut() {
    this.storage.items = [];
    this.updateCounter();
  }
}

module.exports = Cart;