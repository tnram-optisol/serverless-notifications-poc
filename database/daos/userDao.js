const User = require("../entity/User");

const saveUser = async (user) => {
  try {
    await User.create(user);
    return { msg: "User Saved Successfully" };
  } catch (error) {
    throw new Error(err);
  }
};
const userDao = { saveUser };

module.exports = userDao;
