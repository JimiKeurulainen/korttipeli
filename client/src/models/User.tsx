import Deck from "./Deck";
import Card from "./Card";

export default class User {
  #username: string = "";
  #password: string = "";
  #email: string = "";
  #phone: string = "";

  #decks: Array<Deck> = [];
  #activeDeck: Deck = new Deck("", "", []);
  #hand: Array<Card> = [];
  #board: Array<Card> = [];

  constructor(
    username: string, 
    password: string, 
    email: string, 
    phone: string, 
    decks?: Array<Deck>, 
    activeDeck?: Deck, 
    hand?: Array<Card>, 
    board?: Array<Card>
    ) 
  {
    this.#username = username;
    this.#password = password;
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
  setpassword = (password: string) => {
    this.#password = password
  }
  getpassword = () => {
    return this.#password;
  }
  // login = (username: string, password: string, setLogin: void) => {
  //   axios.get('server').then((res: User) => {
  //     if (res.#username === username && res.#password === password) {
  //       setLogin(true);
  //     }
  //   });
  // }
}