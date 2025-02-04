import Item from "@model/unit/object/Item";

export default class Market {
  items: Item[] = [];

  setItem(item: Item) {
    this.items.push(item);
  }

  buy(item: Item) {
    item.unit.gold += item.buyPrice;
    item.unit.inventory.addItem(
      Object.assign(Object.create(Object.getPrototypeOf(item)), item)
    );
  }

  sell(item: Item) {
    if (item.unit.gold < item.sellPrice) return;
    item.unit.gold -= item.sellPrice;
  }
}
