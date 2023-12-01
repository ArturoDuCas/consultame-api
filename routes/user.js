const express = require("express");
const router = express.Router();
const UserControllers = require("../controllers/user")


router.get("/basics/:id", UserControllers.getUserBasics);

router.get("/:id", UserControllers.getUserById);

router.post("/", UserControllers.createUser);

router.patch("/:id", UserControllers.updateUserById);

router.delete("/:id", UserControllers.deleteUser);

router.get("/details/:id", UserControllers.getUserDetails);

router.post("cdetails", UserControllers.createUserWithDetails);

module.exports = router;