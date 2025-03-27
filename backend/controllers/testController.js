const Users = require("../models/testModel");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await Users.find({});

    console.log("data:", users);

    res.status(200).json({
      status: "success",
      body: {
        users,
      },
    });
  } catch (err) {
    console.log(err.message);
  }
};
