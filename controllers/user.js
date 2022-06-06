const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const token_key = process.env.TOKEN_KEY;

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
      .then(userobj => {
          if(!userobj) {
            const error = new Error("User Error");
            error.statusCode = 422;
            throw error;
          }
          loadedUser = userobj;
          return bcrypt.compare(password, userobj.password);
      })
      .then(isEqual => {
          if(!isEqual){
            const error = new Error("Wrong Pass");
            error.statusCode = 401;
            throw error;
          }
          const token = jwt.sign({
              email: loadedUser.email,
              userId: loadedUser._id.toString()
          }, token_key, { expiresIn: '1h' });
          res.status(200).json({ message: "User login sucessfully",token: token, userId: loadedUser._id.toString() });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
};

exports.register = (req, res, next) => {

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt
    .hash(password, 12)
    .then((hashpass) => {
      const user = new User({
        name: name,
        email: email,
        password: hashpass,
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({ message: "User created sucessfully", userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};