const express = require("express");
const {
  getAllContacts,
  getContactById,
  addContact,
  removeContactById,
  updateContactById,
  updateStatusContact,
} = require("../../controllers/contacts");
const { isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

router.use(authenticate);

router.get("/", getAllContacts);

router.get("/:contactId", isValidId, getContactById);

router.post("/", addContact);

router.delete("/:contactId", isValidId, removeContactById);

router.put("/:contactId", isValidId, updateContactById);

router.patch("/:contactId/favorite", isValidId, updateStatusContact);

module.exports = router;
