export const elements = {
  searchForm: document.querySelector(".search"),
  input: document.querySelector(".search__field"),
  resultList: document.querySelector(".results__list"),
  parentOfResult: document.querySelector(".results"),
  pageButtons: document.querySelector(".results__pages"),
  recipeDiv: document.querySelector(".recipe"),
  shoppingList: document.querySelector(".shopping__list"),
  likesMenu: document.querySelector(".likes__field"),
  likesList: document.querySelector(".likes__list"),
};
export const clearLoader = () => {
  const loader = document.querySelector(".loader");
  if (loader) loader.parentNode.removeChild(loader);
};
export const load = (parent) => {
  const load = `<div class="loader">
                  <svg>
                    <use href="img/icons.svg#icon-cw"></use>
                  </svg>
                </div>`;
  parent.insertAdjacentHTML("afterbegin", load);
};
