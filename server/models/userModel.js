import mongoose from "mongoose";

let userSchema = mongoose.Schema({
  username: String, 
  password: String, 
  email: String, 
  phone: String, 
  decks: Array, 
  activeDeck: String
});

const userModel = mongoose.model('User', userSchema); 

export default userModel;