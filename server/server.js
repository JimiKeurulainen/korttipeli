import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Passport } from "passport";

import { getUsers, loginUser, handleMissingToken, registerUser } from "./controllers/userController.js"
import userModel from "./models/userModel.js";

const passport = new Passport();
let app = express();

// PASSPORT SETUP
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'localhost:5173';

passport.use(new Strategy(opts, (jwt_payload, done) => {
  return done(null, jwt_payload);
}));

// MONGO SETUP
const mongoUrl = process.env.MONGODB_URL;
const mongoUser = process.env.MONGODB_USER;
const mongoPass = process.env.MONGODB_PASS;

const url = `mongodb+srv://${mongoUser}:${mongoPass}@${mongoUrl}/UserDB?retryWrites=true&w=majority`;
console.log(url);
mongoose.connect(url).then(
  () => console.log('Connected to mongodb'),
  (e) => console.log('Error connecting to database:', e)
);

app.use(express.json());
app.use(cors());
// const router = app.use(express.Router());
app.get('/api/users', getUsers);
app.post('/api/login', handleMissingToken, passport.authenticate('jwt', {session: false}), loginUser);
app.post('/api/register', registerUser);
app.listen(3000);

console.log('Appi pyörii portissa 3000');