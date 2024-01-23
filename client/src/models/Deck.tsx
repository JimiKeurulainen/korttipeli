import Card from "./Card";

export default class Deck {
  #id: string = "";
  #name: string = "";
  #cards: Array<Card> = [];

  constructor(id: string, name: string, cards: Array<Card>) {
    this.#id = id;
    this.#name = name;
    this.#cards = cards;
  }
}