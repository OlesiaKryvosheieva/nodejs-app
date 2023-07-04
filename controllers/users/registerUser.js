const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const User = require("../../models/users");
const { HttpError, sendMail } = require("../../helpers");
const { nanoid } = require("nanoid");

const { userRegisterSchema } = require("../../schemas/users");
const { BASE_URL } = process.env;

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
    const avatarUrl = gravatar.url(email);
    const verificationToken = nanoid();
    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarUrl,
      verificationToken,
    });

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target = "_blank" href="${BASE_URL}/api/auth/users/verify/${verificationToken}">Click to verify email</a>`,
    };

    await sendMail(verifyEmail);

    res.status(201).json({
      user: { email: newUser.email, subscription: newUser.subscription },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = registerUser;
