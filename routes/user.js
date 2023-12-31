const express = require("express");
const router = express.Router();
const UserControllers = require("../controllers/user")

const AuthControllers = require("../controllers/authentication")


router.post("/register", AuthControllers.createUser);
router.post("/login", AuthControllers.loginUser);

router.get("/basics/:id", UserControllers.getUserBasics);

router.get("/:id", UserControllers.getUserById);

router.put("/:id", UserControllers.updateUserById);

router.delete("/:id", UserControllers.deleteUser);

router.get("/details/:id", UserControllers.getUserDetails);

router.post("/details", UserControllers.createUserWithDetails);


router.put("/name/:id", UserControllers.updateUserNameById);
router.put("/weight/:id", UserControllers.updateUserWeightById);
router.put("/height/:id", UserControllers.updateUserHeightById);

module.exports = router;