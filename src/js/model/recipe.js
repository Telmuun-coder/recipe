import axios from "axios";
export default class Recipe {
  constructor(id) {
    this.id = id;
  }
  async getRecipe() {
    const result = await axios(
      "https://forkify-api.herokuapp.com/api/get?rId=" + this.id
    );
    this.publisher = result.data.recipe.publisher;
    this.ingredionts = result.data.recipe.ingredionts;
    this.source_url = result.data.recipe.source_url;
    this.image_url = result.data.recipe.image_url;
    this.publisher_url = result.data.recipe.publisher_url;
    this.title = result.data.recipe.title;
    this.social_rank = result.data.recipe.social_rank;

    //console.log(this.publisher);
    console.log(result);
  }
}
