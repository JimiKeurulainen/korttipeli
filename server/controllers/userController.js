import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import cryptoRandomString from 'crypto-random-string';
import { pbkdf2Sync } from 'pbkdf2';
import bcrypt from 'bcrypt';

let currentToken = '';

export const getUsers = async (req, res) => {
  console.log('getusers');
  try {
    userModel.find().then(users => {
      console.log(users);
      return res.status(200).json(users);
    }).catch(e => {
      console.log('DB error', e);
      return res.status(500).json({"message": "Internal server error"})
    })
  } catch (error) {
    res.json({ message: error.message });
  }   
}

export const loginUser = async (req, res) => {
  console.log('login user', req.body);
  try {
    userModel.find({"username": req.body.username}).then(users => {
      if (users.length === 1) {
        bcrypt.compare(req.body.password, users[0].password, (err, result) => {
          console.log('comparison result', err, result);
        });
        console.log(users);
        return res.status(200).json(users);
      }
    }).catch(e => {
      console.log('DB error', e);
      return res.status(500).json({"message": "Internal server error"})
    })
  } catch (error) {
    res.json({ message: error.message });
  }   
}

export const handleMissingToken = async (req, res) => {
  console.log('missing token', req.body);
  try {
    const users = await userModel.find({"username": req.body.username});
      // Check if there are multiple similar credentials
      if (users.length > 1) {
        return res.status(409).json({"message": "multiple same usernames detected, please provide your additional username id or log in with email"});
      }
      // Check if there are no matches for credentials
      else if (users.length === 0) {
        return res.status(404).json({"message": "user not found, please check your credentials and try again"});
      }
      else {
        const match = await bcrypt.compare(req.body.password, users[0].password);
        if (match) {
          const newUserToken = jwt.sign(req.body.username, 'secret');
          delete users[0].password;
          
          res.set('Authorization', `bearer ${newUserToken}`);
          console.log('login successful, new jwt', newUserToken);
          return res.status(200).json(users);
        }
      }
  } catch (error) {
    res.json({ message: error.message });
  }   
}

export const registerUser = async (req, res) => {
  console.log('register user', req.body);
  try {
    const matchedUsers = await userModel.find({"username": req.body.username});
    console.log('matchedpsw', matchedUsers);
    matchedUsers.length !== 0 && res.status(409).json({"message": "Username is already in use"});
      
    if (req.body && matchedUsers.length === 0) {
      // const saltedPsw = pbkdf2Sync(req.body.password, 'salt', 1, 32, 'sha512');
      const saltedPsw = await bcrypt.hash(req.body.password, 14);
      console.log('req', req.body, saltedPsw);

      userModel.create({
        username: req.body.username,
        password: saltedPsw,
        email: req.body.email,
        phone: req.body.phone,
        decks: [],
        activeDeck: ''
      }).then(
        response => {
          console.log('res', response);
          res.status(200).json({
            "message": "User succesfully created"
          });
        },
        error => {
          console.log('err', error);
          res.status(500).json({
            "message": "Internal server error",
            "error": error
          });
        }
        )
    }
  } catch (error) {
    res.send({ message: error.message });
  }   
}