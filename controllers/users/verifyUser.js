const { User } = require("../../models");
const { NotFound, BadRequest } = require("http-errors");
const { sendEmail } = require("../../helpers");

const verifyUser = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw NotFound("missing required field email");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw NotFound();
  }
  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }

  const { verificationToken } = user;
  const mail = {
    to: email,
    subject: "Verification e-mail",
    html: `<a target="_blanc" href="http://localhost:3000/api/users/verify/${verificationToken}>Verify e-mail</a>`,
  };

  await sendEmail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = verifyUser;
