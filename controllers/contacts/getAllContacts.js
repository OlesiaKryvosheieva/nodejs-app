const Contact = require("../../models/contacts");

const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 3, ...query } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner, ...query }, { skip, limit });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
