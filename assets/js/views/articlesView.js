import cart from '../localStorage/cart.js';
import navigation from '../localStorage/navigation.js';
import fetcher from '../requests/fetcher.js';

// RENDERS THE CART NUMBER
cart.updateCounter();

// MEMO IN LOCAL STORAGE OF THE ARTICLE BEING REQUESTED
window.setNavigation = (articleElement) => {
  navigation.set(articleElement.dataset.id);
}

// ARTICLE TEMPLATE
function renderArticleTemplate(description, imageUrl, name, price, _id) {
  return (
    /*html*/`
        <article
          data-id=${_id}
          class="section-products__article"
          onclick="setNavigation(this)"
        >
          <a class="section-products__link" href="product.html">
            <img class="section-products__img" src=${imageUrl} alt="Orinoco Teddies ${name}" />
            <div class="section-products__details">
              <div class="section-products__name-n-price">
                <h2 class="section-products__name name">${name}</h2>
                <p class="section-products__price price">$ ${price / 100}</p>
              </div>
              <p class="section-products__description description">
                ${description}
              </p>
            </div>
          </a>
        </article>
    `
  );
}

// GIVEN THE DATA, WE CALL THE TEMPLATE TO RENDER ALL THE ARTICLES
async function renderArticles() {
  const articlesContainer = document.querySelector('.section-products__container');
  articlesContainer.innerHTML = '';
  const articlesData = await fetcher.fetchAllItems();
  articlesData.map(article => {
    const { description, imageUrl, name, price, _id } = article;
    articlesContainer.innerHTML +=
      renderArticleTemplate(description, imageUrl, name, price, _id);
  });
}

renderArticles();