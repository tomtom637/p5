const articlesContainer = document.querySelector('.section-products__container');

const renderHtmlTemplate = (
  description, imageUrl, name, price, _id
) => /*html*/`
<article data-id=${_id} class="section-products__article">
  <img class="section-products__img" src=${imageUrl} alt="a Teddy named ${name}" />
  <div class="section-products__details">
    <div class="section-products__name-n-price">
      <h2 class="section-products__name name">${name}</h2>
      <p class="section-products__price price">$ ${price / 100}</p>
    </div>
    <p class="section-products__description description">
      ${description}
    </p>
  </div>
</article>
`;

async function getArticles(url) {
  const jsonData = await fetch(url);
  const articlesData = await jsonData.json();

  articlesData.map(article => {
    const { description, imageUrl, name, price, _id } = article;
    articlesContainer.innerHTML += renderHtmlTemplate(description, imageUrl, name, price, _id);
  });
}

getArticles('http://localhost:3000/api/teddies');