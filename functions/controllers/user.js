const User = require("../models/user");
const UserDTO = require("../dto/user");
const jwt = require("jsonwebtoken");
const bcrypts = require("bcryptjs");
const { getJwtKey, getValidToken } = require("../utils/utils");
const {
  HTTP_UNAUTHORIZED,
  HTTP_REQUEST_ACCEPTED,
  HTTP_NOT_FOUND,
  HTTP_SERVER_ERROR,
  HTTP_REQUEST_OK,
} = require("../utils/httpCode");
const {
  ERROR_VALIDATING_USER,
  USER_PASSWORD_INCORRECT,
  ERROR_REGISTERING_USER,
  USER_NOT_FOUND,
  ERROR_UPDATING_USER,
  USER_UPDATED_SUCCESSFULLY,
  USER_PASSWORD_UPDATED_SUCCESSFULLY,
  USER_ERROR_UPDATING_PASSWORD,
} = require("../utils/constants/userConstants");

const createToken = async (user) => {
  const { id, name, username } = user;
  const payload = { id, name, username };
  return jwt.sign(payload, getJwtKey());
};

const userLogin = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const userFound = await User.findOne({ email: identifier?.toLowerCase() });
    if (!userFound) {
      return res.status(HTTP_UNAUTHORIZED).json({
        error: USER_PASSWORD_INCORRECT,
      });
    }

    const passwordChecked = await bcrypts.compare(password, userFound.password);
    if (!passwordChecked) {
      return res.status(HTTP_UNAUTHORIZED).json({
        error: USER_PASSWORD_INCORRECT,
      });
    }

    const tokenCreated = await createToken(userFound);
    return res.json({ jwt: tokenCreated });
  } catch (error) {
    console.error(error);
    return res.status(HTTP_REQUEST_ACCEPTED).json({
      error: `${ERROR_VALIDATING_USER}`,
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const newUser = new User(req.body);

    const salt = await bcrypts.genSaltSync(10);
    newUser.password = await bcrypts.hash(newUser.password, salt);
    newUser.username = newUser.username.toLowerCase();
    newUser.confirmed = true;
    newUser.blocked = false;
    newUser.isOwner = 0;

    await newUser.save();

    return res.json({
      registered: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(HTTP_REQUEST_ACCEPTED).json({
      error: `${ERROR_REGISTERING_USER}`,
      registered: false,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const token = await getValidToken(req);
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY);
    const userFound = await User.findOne({ _id: id });

    if (!userFound) {
      return res.status(HTTP_NOT_FOUND).json({
        result: USER_NOT_FOUND,
      });
    }

    const userToSend = new UserDTO(userFound);
    return res.status(HTTP_REQUEST_OK).json(userToSend.getUserData());
  } catch (error) {
    console.error(error);
    return res.status(HTTP_SERVER_ERROR).json({
      result: error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const token = await getValidToken(req);
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY);

    const { password } = req.body;
    if (password !== undefined) {
      const salt = await bcrypts.genSaltSync(10);
      const newPassword = await bcrypts.hash(password, salt);
      await User.findOneAndUpdate({ _id: id }, { password: newPassword })
        .then(() => {
          return res.status(HTTP_REQUEST_OK).json({
            result: `${USER_PASSWORD_UPDATED_SUCCESSFULLY}`,
          });
        })
        .catch((error) => {
          return res.status(HTTP_SERVER_ERROR).json({
            result: `${USER_ERROR_UPDATING_PASSWORD} - error: ${error}`,
          });
        });
    } else {
      await User.findOneAndUpdate({ _id: id }, req.body)
        .then(() => {
          return res.status(HTTP_REQUEST_OK).json({
            result: `${USER_UPDATED_SUCCESSFULLY}`,
          });
        })
        .catch((error) => {
          return res.status(HTTP_SERVER_ERROR).json({
            result: `${ERROR_UPDATING_USER} ${req.body} - error: ${error}`,
          });
        });
    }
  } catch (error) {
    console.error(error);
    return res.status(HTTP_SERVER_ERROR).json({
      result: error,
    });
  }
};

module.exports = {
  userLogin,
  registerUser,
  getUser,
  updateUser,
};
