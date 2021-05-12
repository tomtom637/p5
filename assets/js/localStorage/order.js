class Order {
  set(value) {
    localStorage.setItem('order', JSON.stringify(value));
  }
  get() {
    return JSON.parse(localStorage.getItem('order'));
  }
}

const order = new Order();

export default order;