import Deck from "./Deck";
import Card from "./Card";

export default class User {
  #username: string = "";
  #email: string = "";
  #phone: string = "";

  #decks: Array<Deck> = [];
  #activeDeck: Deck = new Deck("", "", []);
  #hand: Array<Card> = [];
  #board: Array<Card> = [];

  constructor(
    username: string, 
    email: string, 
    phone: string, 
    decks?: Array<Deck>, 
    activeDeck?: Deck, 
    hand?: Array<Card>, 
    board?: Array<Card>
    ) 
  {
    this.#username = username;
    this.#email = email;
    this.#phone = phone;
    decks && (this.#decks = decks);
    activeDeck && (this.#activeDeck = activeDeck);
    hand && (this.#hand = hand);
    board && (this.#board = board);
  }

  setusername = (username: string) => {
    this.#username = username
  }
  getusername = () => {
    return this.#username;
  }
  // login = (username: string, password: string, setLogin: void) => {
  //   axios.get('server').then((res: User) => {
  //     if (res.#username === username && res.#password === password) {
  //       setLogin(true);
  //     }
  //   });
  // }
}