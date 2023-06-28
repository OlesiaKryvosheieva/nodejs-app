const Jimp = require("jimp");
const { HttpError } = require("../../helpers");
const path = require("path");
const fs = require("fs/promises");

const User = require("../../models/users");

const avatarDir = path.resolve("public", "avatars");

const uploadAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    // const resultUpload = path.join(avatarDir, filename);
    // // await fs.rename(tempUpload, resultUpload);
    const avatarUrl = path.join("avatars", filename);
    const imageJimp = await Jimp.read(tempUpload)
      .then((image) => image.resize(250, 250).write(avatarUrl))
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        fs.unlink(tempUpload);
      });
    console.log(imageJimp);
    await User.findByIdAndUpdate(_id, { avatarUrl });

    res.json({
      avatarUrl,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = uploadAvatar;
