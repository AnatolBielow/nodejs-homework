const express = require("express");
const { auth, ctrlWrapper, validation } = require("../../middleware");
const { joiSchema } = require("../../models/user");
const { users: ctrl } = require("../../controllers");

const validateMiddleware = validation(joiSchema);
const router = express.Router();

router.post("/signup", validateMiddleware, ctrlWrapper(ctrl.signup));
router.post("/login", validateMiddleware, ctrlWrapper(ctrl.login));
router.get("/logout",auth, ctrlWrapper(ctrl.logout));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch("/", auth, validateMiddleware, ctrlWrapper(ctrl.updateSubscribtion))
module.exports = router;
