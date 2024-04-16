const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const generateToken = (req, res) => {
    // Validate User Here
    // Then generate JWT Token
 
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 12,
    }
 
    const token = jwt.sign(data, jwtSecretKey);
 
    res.send(token);
};
 
const validateToken = (req, res) => {
    // Tokens are generally passed in header of request
    // Due to security reasons.
 
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
 
    try {
        const token = req.header(tokenHeaderKey);
 
        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            res.send("Successfully Verified");
        } else {
            // Access Denied
            res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        res.status(401).send(error);
    }
};

module.exports = {
  generateToken,
  validateToken,
};