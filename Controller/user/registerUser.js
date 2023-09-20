const userDao = require("../../database/daos/userDao");
const User = require("../../database/entity/User");
const { mongoConnect } = require("../../database/mongoConnect");
const userSchema = require("../../utils/validateUser");

async function registerUser(event, context) {
  try {
    await mongoConnect();
    const user = JSON.parse(event.body);
    const { err, data } = await userSchema.validateAsync(user);

    await userDao.saveUser(user);

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "User Registered" }),
    };
  } catch (error) {
    if ("details" in error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          msg: "Validation Error",
          err: error.details[0].message,
        }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({
          msg: "Some error occured",
          err: error,
        }),
      };
    }
  }
}

module.exports.handler = registerUser;
