describe("the cart functionalities", () => {
  const Cart = require('../../lib/p5/Cart');
  let cart;

  beforeEach(() => {
    cart = new Cart();
  });

  it("should initialize giving us an empty array if a cart isn't already present", () => {
    cart.initialize();
    expect(cart.storage.items).toEqual([]);
    expect(cart.counter).toEqual(0);
  });

  it("should initialize giving us the already present array", () => {
    cart.storage.items = ['one', 'two'];
    cart.updateCounter();
    cart.initialize();
    expect(cart.storage.items).toEqual(['one', 'two']);
    expect(cart.counter).toEqual(2);
  });

  it("should be able to add items", () => {
    cart.initialize();
    cart.addItem('one');
    cart.addItem('two');
    cart.addItem('three');
    expect(cart.storage.items).toEqual(['one', 'two', 'three']);
    expect(cart.counter).toEqual(3);
  });

  it("should be able to remove all items of one kind", () => {
    cart.initialize();
    cart.addItem('one');
    cart.addItem('one');
    cart.addItem('two');
    cart.removeItemType('one');
    expect(cart.storage.items).toEqual(['two']);
    expect(cart.counter).toEqual(1);
  });

  it("should be able to remove only one item amongst many of its kind", () => {
    cart.initialize();
    cart.addItem('one');
    cart.addItem('one');
    cart.addItem('two');
    cart.removeOne('one');
    expect(cart.storage.items).toEqual(['one', 'two']);
    expect(cart.counter).toEqual(2);
  });

  it("should be able to empty out the items list", () => {
    cart.initialize();
    cart.addItem('one');
    cart.addItem('one');
    cart.addItem('two');
    cart.emptyOut();
    expect(cart.storage.items).toEqual([]);
    expect(cart.counter).toEqual(0);
  });

});
