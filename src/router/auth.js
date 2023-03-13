const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/AuthController");
const { authMiddleware, sessionValidation } = require("../middleware/auth");

authRouter.get("/login", authController.loginView);

authRouter.post("/login", sessionValidation, authController.loginUser);

authRouter.get("/register", authController.registerView);

authRouter.post("/register", authController.registerUser);

authRouter.get("/logout", authController.logOutUser);

authRouter.get("/restorePassword", authController.restorePasswordView);

authRouter.post("/restorePassword", authController.restorePassword);

module.exports = authRouter;