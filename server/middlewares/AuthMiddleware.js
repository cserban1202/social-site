const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => { 
    const accessToken = req.header("accessToken"); // get the accessToken from the header
    
    if(!accessToken) return res.json({error: "you must be logged in to comment"}); // if there is no accessToken, return an error message

    try {
        const validToken = verify(accessToken, "importantsecret"); // verify the accessToken
        req.user = validToken; // if the accessToken is valid, set the user to the validToken
        if(validToken) { // if the accessToken is valid, move on to the next middleware
            return next();
        }

    } catch (err) {
        return res.json({error: err}); 
    }
};

module.exports = { validateToken };