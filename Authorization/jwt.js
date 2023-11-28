require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const createToken = (user_id) => {
    const token = jwt.sign({ id: user_id }, process.env.JWT_SECRET, {
        expiresIn: 86400, // 24 hours
    });
    return token;
}



const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }

    // Split the header into two parts: 'Bearer' and the '<token_value>'
    const bearer = token.split(' ');
    // Check if the bearer array has the Bearer string and token
    if (bearer.length === 2 && bearer[0] === 'Bearer') {
        // The actual token is the second element in the array
        const token = bearer[1];
        
        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            }
            // If everything is good, save to request for use in other routes
            req.userId = decoded.id;
            next();
        });
    } else {
        // Handle scenarios where the format is incorrect or the 'Bearer' keyword is missing
        return res.status(400).send({ auth: false, message: 'Token is not in the proper format.' });
    }
};

module.exports = {
    createToken, verifyToken
}