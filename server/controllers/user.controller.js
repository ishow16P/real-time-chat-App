const bcrypt = require("bcrypt");
const userService = require("../services/user.service");
const status = require("../configs/status");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await userService.findByUsername(username);
    if (usernameCheck) {
      return res.status(403).json({
        RESULT_CODE: status.DATA_EXIST.RESULT_CODE,
        RESULT_MESSAGE: "Username already used",
      });
    }
    const emailCheck = await userService.findByUsername(email);
    if (emailCheck) {
      console.log(emailCheck);
      return res.status(403).json({
        RESULT_CODE: status.DATA_EXIST.RESULT_CODE,
        RESULT_MESSAGE: "Email already used",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userInfo = {
      username: username,
      email: email,
      password: hashedPassword,
    };
    const user = await userService.create(userInfo);
    if (user) {
      delete user.password;
      return res.status(201).json({
        RESULT_CODE: status.CREATED.RESULT_CODE,
        RESULT_MESSAGE: status.CREATED.DEVELOPER_MESSAGE,
        user,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      RESULT_CODE: status.SYSTEM_ERROR.RESULT_CODE,
      RESULT_MESSAGE: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
    });
  }
};

module.exports.login = async (req, res, next) => {
  try {

    const { username, password } = req.body;
    const user = await userService.findByUsername(username);
    if (!user) {
      return res.status(403).json({
        RESULT_CODE: status.DATA_EXIST.RESULT_CODE,
        RESULT_MESSAGE: "Incorrect username or password",
      });
    }
    const isPasswordValild = await bcrypt.compare(password, user.password);
    if (!isPasswordValild) {
      return res.status(403).json({
        RESULT_CODE: status.DATA_EXIST.RESULT_CODE,
        RESULT_MESSAGE: "Incorrect password",
      });
    }
    delete user.passowrd;
    return res.status(200).json({
      RESULT_CODE: status.SUCCESS.RESULT_CODE,
      RESULT_MESSAGE: status.CREATED.DEVELOPER_MESSAGE,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      RESULT_CODE: status.SYSTEM_ERROR.RESULT_CODE,
      RESULT_MESSAGE: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
    });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.findAll(req.params.id);
    return res.status(200).json({
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      RESULT_CODE: status.SYSTEM_ERROR.RESULT_CODE,
      RESULT_MESSAGE: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
    });
  }
};

module.exports.setAvatar = async (req, res) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await userService.update(userId, avatarImage);
    return res.status(200).json({
      isSet: userData.isAvatarImageSet,
      image: userData.isAvatarImage,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      RESULT_CODE: status.SYSTEM_ERROR.RESULT_CODE,
      RESULT_MESSAGE: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
    });
  }
};
