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
  printErrors() {
    const errorMessageElements = document.querySelectorAll('.section-form__error-message');
    errorMessageElements.forEach(el => el.remove());

    const styledEl = document.querySelectorAll('.section-form__error');
    styledEl.forEach(el => el.classList.remove('section-form__error'));

    for(let field in this.fields) {
      this.fields[field].errors.forEach(err => {
        const el = document.createElement('span');
        el.classList.add('section-form__error-message');
        el.textContent = err;
        this.fields[field].domElement.insertAdjacentElement('afterend', el);
        this.fields[field].domElement.classList.add('section-form__error');
      });
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    // POST REQUEST
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