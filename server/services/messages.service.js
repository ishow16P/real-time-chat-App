const Message = require("../models/message.model");

module.exports.create = async (data) => {
  try {
    const messageInfo = {
      message: { text: data.message },
      users: [data.from,data.to],
      sender: data.from
    };
    return Message.create(messageInfo)
  } catch (error) {
    console.log(error)
    return new Error(error.message);
  }
};

module.exports.findMsg = async (data) => {
    try {
        const messages = await Message.find({
            users:{
                $all: [data.from, data.to]
            }
        }).sort({ updatedAt : 1})
        return messages;
    } catch (error) {
        console.log(error)
        return new Error(error.message);
    }
}
