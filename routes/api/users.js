const express = require("express");
const { auth, ctrlWrapper, validation, upload } = require("../../middleware");
const { joiSchema } = require("../../models/user");
const { users: ctrl } = require("../../controllers");

const validateMiddleware = validation(joiSchema);
const router = express.Router();

router.post("/signup", validateMiddleware, ctrlWrapper(ctrl.signup));
router.post("/login", validateMiddleware, ctrlWrapper(ctrl.login));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/",
  auth,
  validateMiddleware,
  ctrlWrapper(ctrl.updateSubscribtion)
);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.post("/verify", ctrlWrapper(ctrl.verifyUser))

module.exports = router;
