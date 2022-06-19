const { User } = require("../../models");
const { NotFound } = require("http-errors");

const updateSubscribtion = async (req, res) => {
  const { _id } = req.params;
  const { subscription } = req.body;
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  if (!result) {
    throw new NotFound();
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateSubscribtion;

