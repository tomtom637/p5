import order from '../localStorage/order.js';


function renderConfirmationTemplate() {
  const { firstName, lastName, address, city, email } = order.get().contact;
  const { orderId } = order.get();
  let totalPrice = 0;
  order.get().products.forEach(product => totalPrice += product.price / 100);
  return (
    /*html*/`
      <h2>THANK YOU ${firstName} ${lastName}</h2>
      <p>your order id is ${orderId}</p>
      <p>The total price is $ ${totalPrice}</p>
    `
  );
}

function renderConfirmation() {
  const confirmationElement = document.getElementById('confirmation');
  if(order.get()) {
    confirmationElement.innerHTML = renderConfirmationTemplate();
    //order.set('');
  }
}

renderConfirmation();