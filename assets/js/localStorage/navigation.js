class Navigation {
  set(value) {
    localStorage.setItem('navigation', value);
  }
  get() {
    return localStorage.getItem('navigation');
  }
}

const navigation = new Navigation();

export default navigation;