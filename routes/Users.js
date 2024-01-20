const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");
const userController = require("../controllers/userController");

// login Auth
router.get("/auth", validateToken, userController.auth);

//Login Admin
router.post("/login", userController.loginUser);

// Register Admin
router.post("/register", userController.registerUser);

//Get all Admins
router.get("/all", validateToken, userController.getAllUsers);

//Get admin by id
router.get("/single/:id", validateToken, userController.getUser);

// User Action Button APIs
router.get("/deleteuser/:id", validateToken, userController.DeletedUserById);

router.get("/activeuser/:id", validateToken, userController.ActivateUser);

router.get("/blockuser/:id", validateToken, userController.BlockedUserById);

router.get("/unblockuser/:id", validateToken, userController.UnBlockUser);

router.get("/confirmuser/:id", validateToken, userController.ConfirmUserById);

router.get("/unconfirmuser/:id", validateToken, userController.UnConfirmUser);

router.get("/suspenduser/:id", validateToken, userController.SuspendUserById);

router.get("/unsuspenduser/:id", validateToken, userController.UnSuspendUser);

module.exports = router;
