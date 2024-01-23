export default class Card {
  #name: string = "";
  #health: number = 0;
  #attack: number = 0;
  #type: string = "";
  #flavor: string = "";

  constructor(name: string, health: number, attack: number, type: string, flavor: string) {
    this.#name = name;
    this.#health = health;
    this.#attack = attack;
    this.#type = type;
    this.#flavor = flavor;
  }
}