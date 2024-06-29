const User = require("../models/user");
const jwtHelperes = require("../utils/jwthelperes");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && bcrypt.compareSync(password, user.password)) {
    res.json({
      message: "Logged In successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        accessToken: jwtHelperes.sign({ sub: user.id }),
      },
    });
  } else {
    res.status(401).json({
      message: "Invalid user information",
    });
  }
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = User({
    name,
    email,
    password: bcrypt.hashSync(password, 8),
  });
  try {
    await user.save();
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Somthing went wrong!",
    });
  }
};

exports.me = async (req, res) => {
  const user = await User.findById(req.userId);
  res.json({
    success: true,
    date: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
};
