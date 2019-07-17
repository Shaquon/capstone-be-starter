const { User } = require("../models");
const { validateJwtMiddleware } = require("../auth");

function getRawUser(user) {
  const rawUser = user.toJSON();
  delete rawUser._id;
  delete rawUser.password;
  delete rawUser.picture;
  delete rawUser.pictureContentType;
  return rawUser;
}

const getUser = async (req, res, next) => {
  const id = req.params.username;
  try {
    const user = await User.scope(null).findById(id);

    if (!user) {
      next({
        statusCode: 404,
        message: "User does not exist"
      });
      return;
    }
    res.send({ user: getRawUser(user), statusCode: res.statusCode });
  } catch (err) {
    next(err);
  }
};

// create a new user
const createUser = async (req, res, next) => {
  const { username, password, role } = req.body;
  try {
    const user = await User.create({
      username,
      password,
      role
    });
    res.send({ user: getRawUser(user), statusCode: res.statusCode });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  getUser
};
