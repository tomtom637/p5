import cart from '../localStorage/cart.js';
import order from '../localStorage/order.js';

// RENDERS THE CART NUMBER
cart.updateCounter();

function renderConfirmationTemplate() {
  const { firstName, lastName, address, city, email } = order.get().contact;
  const { orderId } = order.get();
  let totalPrice = 0;
  order.get().products.forEach(product => totalPrice += product.price / 100);
  return (
    /*html*/`    
      <div class="section-confirmation__container">
        <h2 class="section-confirmation__header">
          <span class="section-confirmation__thank-you">THANK YOU</span> ${firstName}
        </h2>
        <p class="section-confirmation__order-id">your order id is <br /><span class="section-confirmation__id">${orderId}<span></p>
        <div class="section-confirmation__total-n-img">
          <img class="section-confirmation__img" src="assets/img/success.jpg" alt="happy teddy" />
          <p class="section-confirmation__total">The total price is $${totalPrice}</p>
        </div>
      </div>
    `
        
  );
}

function renderConfirmation() {
  const confirmationElement = document.getElementById('confirmation');
  if(order.get()) {
    confirmationElement.innerHTML = renderConfirmationTemplate();
    order.set('');
  }
}

renderConfirmation();