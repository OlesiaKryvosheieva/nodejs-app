const bcrypt = require("bcryptjs");
const User = require("../../models/users");
const { HttpError } = require("../../helpers");

const { userRegisterSchema } = require("../../schemas/users");

const registerUser = async (req, res, next) => {
  try {
    const { error } = userRegisterSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json({
      user: { email: newUser.email, subscription: newUser.subscription },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = registerUser;
