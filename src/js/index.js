require("@babel/polyfill");
import axios from "axios";
import Search from "./model/search";
import { elements, load, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/recipe";
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

const r = new Recipe(47746);
r.getRecipe();
