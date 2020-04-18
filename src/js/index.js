require("@babel/polyfill");
import Search from "./model/search";
import { elements, load, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/recipe";
import List from "./model/List";
import * as listView from "./view/listView";
import Like from "./model/Like";
import * as likesView from "./view/likesView";
import {
  renderRecipe,
  clearRecipe,
  highlightSelectedRecipe,
} from "./view/recipeView";
/**
 *       Web app төлөв
 *  - Хайлтыг query, үр дүн
 *  - Тухайн үзүүлж байгаа жор
 *  - Favorite recipes
 *  - Захиалсан жорын найрлага
 */
const state = {};
const controlSearch = async () => {
  // 1). Web-с хайлтын түлхүүр үгийг гаргаж авна
  const query = searchView.getInput();
  if (query) {
    // 2). Search хайлтын object үүсгэнэ
    state.search = new Search(query);
    // 3). Хайлтын UI-г бэлтгэнэ
    searchView.clearResult();
    searchView.clearField();
    load(elements.parentOfResult);
    // 4). Хайлтыг гүйцэтгэнэ
    await state.search.doSearch();
    // 5). Хайлтын үр дүнг үзүүлнэ
    clearLoader();
    if (state.search.recipes === undefined) alert("Хайлт олдсонгүй");
    else searchView.render(state.search.recipes);
  }
};
elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});
elements.pageButtons.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const gotoPageNumber = parseInt(btn.dataset.goto, 10);
    searchView.clearResult();
    searchView.render(state.search.recipes, gotoPageNumber);
  }
});

const controlRecipe = async () => {
  //1. URL-aas ID-г салгана
  const id = location.hash.replace("#", "");
  if (!state.likes) state.likes = new Like();
  if (id) {
    //2. Жорын моделийг үүсгэнэ.
    state.recipe = new Recipe(id);
    //3. UI цэвэрлэнэ.
    clearRecipe();
    load(elements.recipeDiv);
    highlightSelectedRecipe(id);
    //4. Жороо татаж авчирна.
    await state.recipe.getRecipe();
    //5. Жорыг гүйцэтгэх хугацаа болон орцыг тодорхойлно.
    clearLoader();
    state.recipe.calcTime();
    state.recipe.calcPorts();
    //6. Жороо дэлгэцэнл гаргана.
    renderRecipe(state.recipe, state.likes.isLiked(id));
  }
};

// window.addEventListener("", controlRecipe);
// window.addEventListener("load", controlRecipe);

["hashchange", "load"].forEach((e) =>
  window.addEventListener(e, controlRecipe)
);
window.addEventListener("load", (e) => {
  //shineer like modeliig app achaallahad uusgene.
  if (!state.likes) state.likes = new Likes();

  //like tses garah esehiig shiideh
  likesView.togleLikeMenu(state.likes.numberOfLikes());

  //likes baival tedgeeriig tsesend nemj haruulna.

  state.likes.likes.forEach((like) => likesView.renderLike(like));
});

//Найрлагын контролл

const controlList = () => {
  //Sagsiig tseverlene
  listView.clearItems();
  //1. Nairlagiin model uusgene
  state.list = new List();
  //2. Ug model ruu odo haragdaj baigaa jornii nairlagiig avch hiine.
  state.recipe.ingredients.forEach((n) => {
    const item = state.list.addItem(n);
    //Moderliig delgetsen gargana.
    listView.renderItem(item);
  });
};
//favorite controller
const controlLike = () => {
  // Daragdsan joriig Fave luu hiine.
  // 1. Like model object uusgene.
  if (!state.likes) state.likes = new Like();
  // 2. get currently id of recipe
  const currentRecipeId = state.recipe.id;
  // 3. check liked or not
  if (state.likes.isLiked(currentRecipeId)) {
    // if liked put back like
    state.likes.deleteLike(currentRecipeId);
    //haragdaj baiga favo-gos ustgana
    likesView.deleteLike(currentRecipeId);
    //like awah || get back like
    likesView.toggleLikeBtn(false);
  } else {
    // else put like
    const newLike = state.likes.addLike(
      currentRecipeId,
      state.recipe.title,
      state.recipe.publisher,
      state.recipe.image_url
    );
    likesView.renderLike(newLike);
    likesView.toggleLikeBtn(true);
  }
  likesView.togleLikeMenu(state.likes.numberOfLikes());
};
elements.recipeDiv.addEventListener("click", (e) => {
  if (e.target.matches(".recipe__btn, .recipe__btn *")) controlList();
  else if (e.target.matches(".recipe__love, .recipe__love *")) {
    controlLike();
  }
});

elements.shoppingList.addEventListener("click", (e) => {
  if (e.target.matches(`svg, svg *`)) {
    const id = e.target.closest(".shopping__item").dataset.itemid;
    //Oldson Id-tei ortsiig modeloos ustgana
    state.list.deleteItem(id);
    //Delgetsees iim ID-tei ortsiig delgetsen deeres olj ustgana.
    listView.deleteItem(id);
  }
});
