const messageService = require("../services/messages.service");
const status = require("../configs/status");

module.exports.addMessage = async (req, res) => {
  try {
    const body = req.body;
    const data = await messageService.create(body);
    if (data) {
      return res.status(201).json({
        RESULT_CODE: status.CREATED.RESULT_CODE,
        RESULT_MESSAGE: status.CREATED.DEVELOPER_MESSAGE,
      });
    } else {
      return res.status(403).json({
        RESULT_CODE: status.DATA_EXIST.RESULT_CODE,
        RESULT_MESSAGE: status.DATA_EXIST.DEVELOPER_MESSAGE,
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

module.exports.getAllMessage = async (req, res) => {
  try {
      const body = req.body;
      const messages = await messageService.findMsg(body);
      const projectMessages = messages.map((msg) => {
          return {
              fromSelf: msg.sender.toString() == body.from,
              message: msg.message.text
          }
      })
      res.status(200).json(projectMessages)
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      RESULT_CODE: status.SYSTEM_ERROR.RESULT_CODE,
      RESULT_MESSAGE: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
    });
  }
};
