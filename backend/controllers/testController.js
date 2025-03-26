const Comments = require("../models/testModel");

exports.getComments = async (req, res, next) => {
  try {
    const comments = await Comments.find();

    console.log("comments:", comments);

    res.status(200).json({
      status: "success",
      body: {
        comments,
      },
    });
  } catch (err) {
    console.log(err.message);
  }
};
