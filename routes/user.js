const express = require("express");
const router = express.Router();
const UserControllers = require("../controllers/user")


router.get("/", UserControllers.getAllUsers);
router.get("/basics/:id", UserControllers.getUserBasics);

router.get("/:id", UserControllers.getUserById);

router.post("/", UserControllers.createUser);

router.patch("/:id", UserControllers.updateUserById);

router.delete("/:id", UserControllers.deleteUser);


module.exports = router;