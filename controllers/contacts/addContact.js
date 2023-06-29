const fs = require("fs/promises");
const path = require("path");

const Contact = require("../../models/contacts");
const HttpError = require("../../helpers/index");

const { contactAddSchema } = require("../../schemas/contacts");

// const contactsDir = path.resolve("public", "avatars");

const addContact = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "Missing required name field");
    }
    const { _id: owner } = req.user;
    // const { path: oldPath, filename } = req.file;
    // const newPath = path.join(contactsDir, filename);
    // await fs.rename(oldPath, newPath);

    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
