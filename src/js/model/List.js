import uniqid from "uniqid";
export default class List {
  constructor() {
    this.items = [];
  }

  deleteItem(id) {
    //id gedeg ID-tei ortsiin indexiig massivaas haij olno
    const index = this.items.findIndex((el) => el.id === id);
    //Ug index deer elementiiig massivaas ustgana
    this.items.splice(index, 1);
  }
  addItem(item) {
    let newItem = {
      item, //meaning " item: item"
      id: uniqid(),
    };
    this.items.push(newItem);
    return newItem;
  }
}
