const express = require("express");
const { auth, ctrlWrapper, validation } = require("../../middleware");
const { joiSchema, statusSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const validateMiddleware = validation(joiSchema);

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", auth, ctrlWrapper(ctrl.getContactById));

router.post("/", auth, validateMiddleware, ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", auth, ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  auth,
  validateMiddleware,
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  auth,
  validation(statusSchema),
  ctrlWrapper(ctrl.updateById)
);

module.exports = router;
