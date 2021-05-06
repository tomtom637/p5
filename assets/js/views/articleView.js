import cart from '../localStorage/cart.js';
import navigation from '../localStorage/navigation.js';
import fetcher from '../requests/fetcher.js';

// RENDERS THE CART NUMBER
cart.updateCounter();

const colorPalette = {
  'Tan': 'tan',
  'Chocolate': 'chocolate',
  'Black': 'black',
  'White': 'white',
  'Pale brown': '#987654',
  'Dark brown': '#644117',
  'Brown': 'brown',
  'Blue': 'blue',
  'Pink': 'pink',
  'Beige': 'beige'
}

// BUTTON CLICK EVENT CALLBACK
window.addToCart = () => {
  cart.addItem(navigation.get());
}

// COLOR CLICK EVENT CALLBACK
window.setActiveColor = element => {
  document.querySelectorAll('.color')
    .forEach(colorElement => {
      if(colorElement.classList.contains('section-single__color--active')) {
        colorElement.classList.remove('section-single__color--active');
      }
    });
  element.classList.add('section-single__color--active');
}

function renderArticleTemplate(articleData) {
  const { _id, name, description, price, imageUrl, colors } = articleData;
  return (
    /*html*/`
      <article data-id=${_id} class="section-single__article">
        <img class="section-single__img" src=${imageUrl} alt="Orinoco Teddies ${name}" />
        <div class="section-single__name-price-n-colors">
          <h2 class="section-single__name name">${name}</h2>
          <p class="section-single__price price">$ ${price / 100}</p>
          <div class="section-single__colors">
            ${colors.map(color => /*html*/`
              <span
                class="section-single__color color ${color === colors[0] ? 'section-single__color--active' : ''}"
                style="background-color:${colorPalette[color]};"
                onclick="setActiveColor(this)"
              ></span>
            `).join('')}
          </div>
        </div>
        <p class="section-single__description description">
          ${description}
        </p>
        <div class="section-single__buttons">
          <a
            class="section-single__button button"
            href="cart.html"
            onclick="addToCart()"
            >
            Add to Cart & Checkout
          </a>
          <a
            class="section-single__button button"
            href="index.html"
            onclick="addToCart()"
            >
            Add to Cart & Browse Teddies
          </a>
          <a
            class="section-single__button button button--secondary"
            href="index.html"
            >
            Back to Teddies
          </a>
        </div>        
      </article>
    `
  );
}

async function renderArticle() {
  const articleContainer = document.querySelector('.section-single__container');
  const articleData = await fetcher.fetchItem(navigation.get());
  articleContainer.innerHTML = renderArticleTemplate(articleData);
}

renderArticle();
