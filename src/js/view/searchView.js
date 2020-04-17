import { elements } from "./base";

export const getInput = () => elements.input.value;

const renderRecipe = (recipe) => {
  const markup = `
                <li>
                    <a class="results__link results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${recipe.title}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>`;
  elements.resultList.insertAdjacentHTML("beforeend", markup);
};
export const clearField = () => {
  elements.input.value = "";
};
export const clearResult = () => {
  elements.resultList.innerHTML = "";
  elements.pageButtons.innerHTML = "";
};
export const render = (recipes, currentPage = 1, resPerPage = 10) => {
  //Хайлтын үр дүнг хуудаслан үзүүлэх
  const start = (currentPage - 1) * resPerPage;
  const end = currentPage * resPerPage;
  recipes.slice(start, end).forEach(renderRecipe);

  //хуудас шилжих товч
  const totalPages = Math.ceil(recipes.length / resPerPage);
  renderButtons(currentPage, totalPages);
};

const createButton = (page, type, direction) => `
  <button class="btn-inline results__btn--${type}" data-goto=${page}>
  <span>Хуудас ${page}</span>
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-${direction}"></use>
      </svg>
  </button>`;

const renderButtons = (currentPage, totalPages) => {
  let button;
  if (currentPage === 1 && totalPages > 1) {
    //Ehnii huudas
    button = createButton(2, "next", "right");
  } else if (currentPage < totalPages) {
    //Dund
    button = createButton(currentPage - 1, "prev", "left");
    button += createButton(currentPage + 1, "next", "right");
  } else {
    //Last page
    button = createButton(currentPage - 1, "prev", "left");
  }
  elements.pageButtons.insertAdjacentHTML("afterbegin", button);
};
