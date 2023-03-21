const { Users } = require('../models');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { validateToken } = require('../middlewares/AuthMiddleware');

const { sign } = require('jsonwebtoken');

router.post("/", async (req, res) => {
    const { username, password } = req.body; // grab the username and password from the request body
    // hashing the password; grab the hashed password with hash
    bcrypt.hash(password, 10).then((hash) => { 
        Users.create({
            username: username, // store the username in the database
            password: hash // store the hashed password in the database
        });
        res.json("User created");
    }) 
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body; // grab the username and password from the request body
    const user = await Users.findOne({ where: { username: username } }); //tell the sql to go to user table and find the user with the username

    if(!user) {
        res.json({error: "User doesn't exist"}); // if the user doesn't exist, send an error message
    }

    // if the user exists, compare the password with the hashed password
    bcrypt.compare(password, user.password).then((match) => {
       if(!match) {
           res.json({error: "Wrong username/password combination"}); // if the password doesn't match, send an error message
       } 
       
    const accessToken = sign(
        { username: user.username, id: user.id },
        "importantsecret"
      );
      res.json({token: accessToken, username: username, id: user.id}); // if the password matches, send the token
    });
});

router.get('/auth', validateToken, (req, res) => {
    res.json(req.user); // if the user is logged in, send the user information
}) 

module.exports = router;

