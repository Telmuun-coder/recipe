export default class Like {
  constructor() {
    this.readDataFromLocal();
    if (!this.likes) this.likes = [];
  }
  addLike(id, title, publisher, img) {
    const like = { id, title, publisher, img };
    this.likes.push(like);
    //local luuu hadlagalna
    this.saveDataToLocal();
    return like;
  }
  deleteLike(id) {
    //id gedeg ID-tei ortsiin indexiig massivaas haij olno
    const index = this.likes.findIndex((el) => el.id === id);
    //Ug index deer elementiiig massivaas ustgana
    this.likes.splice(index, 1);

    //local luu hadlagalna
    this.saveDataToLocal();
  }
  isLiked(id) {
    return this.likes.findIndex((el) => el.id === id) !== -1;
  }
  numberOfLikes() {
    return this.likes.length;
  }

  saveDataToLocal() {
    localStorage.setItem("likes", JSON.stringify(this.likes));
  }
  readDataFromLocal() {
    this.likes = JSON.parse(localStorage.getItem("likes"));
  }
}
