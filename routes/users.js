const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Model
const User = require('../models/User');


router.post('/register', function(req, res, next) {
  const {username,password} = req.body;


  bcrypt.hash(password, 10).then((hash) => {
    const users = new User({
      username,
      password: hash
    });

    const promise = users.save();

    promise.then(data => {
      res.json(data)
    }).catch((err) => {
      res.json(err)
    });

  });

});

router.post('/authenticate', (req,res) => {

    const { username, password } = req.body;
    User.findOne({ username })
        .then(user => {
          if (!user) {
            res.json({
              status: false,
              message: "Authentication Failed, User not found"
            });
          }
          else{
            bcrypt.compare(password, user.password).then(result => {
              if (!result){
                res.json({
                  status: false,
                  message: "Authentication Failed Wrong Password"
                });
              }
              else{
                const payload = {username};
                const token = jwt.sign(payload,req.app.get('api_secret_key') , {
                  expiresIn: 720 //12 saat
                });
                res.json({
                  status: true,
                  token
                })
              }
            })
          }

        }).catch(error => {
          console.error(error);
          res.status(500).json({ error: 'Bir hata oluştu' });
        });
});







module.exports = router;
