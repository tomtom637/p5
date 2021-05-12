import cart from '../localStorage/cart.js';
import order from '../localStorage/order.js';
import fetcher from '../requests/fetcher.js';

class Validator {
  constructor({ formId, fieldsIds }) {
    this.formId = formId;
    this.fieldsIds = fieldsIds;
    this.fields = {};
    this.initialize();
  }
  initialize() {
    this.form = document.getElementById(this.formId);
    this.form.addEventListener('submit', this.handleSubmit.bind(this));

    this.fieldsIds.forEach(id => {
      this.fields[id] = {};
      this.fields[id].domElement = document.getElementById(id);
      this.fields[id].domElement.addEventListener('input', this.validateInput.bind(this));
      this.fields[id].errors = [];
    });
  }
  createError(error) {
    const el = document.createElement('span');
    el.classList.add('section-form__error-message');
    el.textContent = error;
    return el;
  }
  printErrors() {
    const errorMessageElements = document.querySelectorAll('.section-form__error-message');
    errorMessageElements.forEach(el => el.remove());

    const styledEl = document.querySelectorAll('.section-form__error');
    styledEl.forEach(el => el.classList.remove('section-form__error'));

    for(let field in this.fields) {
      this.fields[field].errors.forEach(err => {
        let errorElement = this.createError(err);
        this.fields[field].domElement.insertAdjacentElement('afterend', errorElement);
        this.fields[field].domElement.classList.add('section-form__error');
      });
    }
  }
  async handleSubmit(e) {
    e.preventDefault();
    const emptyElementsError = document.querySelector('.empty-elements-error');
    if(emptyElementsError) emptyElementsError.remove();

    for(let field in this.fields) {
      if(this.fields[field].domElement.value === '') {
        let errorElement = this.createError('all fields need to be filled up');
        errorElement.classList.add('empty-elements-error');
        document.getElementById('submit').insertAdjacentElement('beforebegin', errorElement);
        return;
      }
      if(this.fields[field].errors.length !== 0) return;
    }
    // POST REQUEST
    const contactInfos = {
      'firstName': this.fields['first-name'].domElement.value,
      'lastName': this.fields['last-name'].domElement.value,
      'address': this.fields['address'].domElement.value,
      'city': this.fields['city'].domElement.value,
      'email': this.fields['email'].domElement.value
    };
    const items = cart.getItems();

    const result = await fetcher.postOrder(contactInfos, items);
    order.set(result);
    cart.emptyOut();
    window.location.replace('/confirmation.html');
  }
  validateInput(e) {
    // standard fields cases
    if(e.target.id !== 'email') {

      if(e.target.value.trim().length < 2) {
        this.fields[e.target.id].errors.length = 0;
        this.fields[e.target.id].errors.push('this field requiers at least 2 characters...');
        this.printErrors();
      } else {
        this.fields[e.target.id].errors.length = 0;
        this.printErrors();
      }
      return;
    }
    // email case
    if(!(/\S+@\S+\.\S+/.test(e.target.value))) {
      this.fields[e.target.id].errors.length = 0;
      this.fields[e.target.id].errors.push('this is not a valid email address');
      this.printErrors();
    } else {
      this.fields[e.target.id].errors.length = 0;
      this.printErrors();
    }
  }
}

const validator = new Validator({
  formId: 'purchase-form',
  fieldsIds: ['first-name', 'last-name', 'address', 'city', 'email']
});

export default validator;