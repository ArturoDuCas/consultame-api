const { id } = require("date-fns/locale");
const { prisma } = require("../config/db");
const { createToken } = require("../services/jwt.js");
const bcrypt = require('bcrypt');

function encrypter(password, callback) { 
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) {
            // Handle the error case
            callback(err);
        } else {
            // Return the generated hash
            callback(null, hash);
        }
    });
}

function verifyPassword(text_password, stored_hash, callback) {
    bcrypt.compare(text_password, stored_hash, function(err, result) {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
}




module.exports = {
    createUser: async (req, res) => {
        const { name, email, password, sex } = req.body;
        console.log("Create user endpoint called");
        encrypter(password, async (err, hash) => {
            if (err) {
                return res.status(500).json({ message: "Error al hash the password", error: err });
            }
            
            try {
                const user = await prisma.user.findUnique({
                    where: {
                        email: email,
                    },
                });

                if (!user) {

                    const create_user = await prisma.user.create({
                        data: {
                            name,
                            email,
                            password: hash, // store the hashed password
                            sex_id: parseInt(sex),
                        },
                    });
                    const user_id = create_user.id;
                    const jwt = createToken(user_id);
                    const response = {
                        user_id: user_id,
                        token: jwt,
                    };
                    res.status(200).json(response);
                } else {
                    const response = {
                        "error_string": "Error all registrar usuario",
                        "message" : "Ya hay un usuario con el correo: '" + email + "' already exists"
                    }
                    res.status(409).json(response)
                }
            } catch (err) {
                res.status(500).json({ message: "Error al crear el usuario", error: err });
                console.log( "Error al crear el usuario: ", err);
            }
        });
    },
    loginUser: async (req, res) => {
        console.log("Login user endpoint called");

        const { email, password } = req.body;

        try {
            // Step 1: Fetch user from database
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            // Step 2: Check if user exists
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // You have the user and the hashed password from the database
            // Now, you need to verify the provided password against the hashed password.
            verifyPassword(password, user.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ message: "Error verifying password", error: err });
                }
                // Step 3: Check if password matches
                if (!isMatch) {
                    return res.status(401).json({ message: "Invalid password" });
                }

                // Step 4: Passwords match, create JWT
                const user_id = user.id;
                const jwt = createToken(user_id);

                // Step 5: Send response with JWT
                res.status(200).json({
                    user_id: user_id,
                    token: jwt,
                });
            });
        } catch (err) {
            res.status(500).json({ message: "Login failed", error: err });
        }
    },
};

