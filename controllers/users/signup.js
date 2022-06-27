const { Conflict } = require("http-errors");
const { User } = require("../../models");
const gravatar = require("gravatar");
const nanoid = require("nanoid");
const { sendEmail } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const newUser = new User({ email, avatarURL, verificationToken });
  newUser.setPassword(password);

  await newUser.save();
  const mail = {
    to: email,
    subject: "Verification e-mail",
    html: `<a target="_blanc" href="http://localhost:3000/api/users/verify/${verificationToken}>Verify e-mail</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        avatarURL,
        subscription: "starter",
        verificationToken,
      },
    },
  });
};

module.exports = signup;
