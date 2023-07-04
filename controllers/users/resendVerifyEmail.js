const User = require("../../models/users");
const { HttpError } = require("../../helpers");

const { emailSchema } = require("../../schemas/users");

const { BASE_URL } = process.env;

const { sendMail } = require("../../helpers");

const resendVerifyEmail = async (req, res, next) => {
  try {
    const { error } = emailSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email not found");
    }
    if (user.verify) {
      throw HttpError(400, "Verification has already been passed");
    }

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target = "_blank" href="${BASE_URL}/api/auth/users/verify/${user.verificationToken}">Click to verify email</a>`,
    };

    await sendMail(verifyEmail);

    res.json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerifyEmail;
