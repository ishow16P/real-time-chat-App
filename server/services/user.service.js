const User = require("../models/user.model")

module.exports.findByUsername = async (username) => {
    try {
        return await User.findOne({ username })
    } catch (error) {
        console.log(error)
        return new Error(error.message);
    }
}

module.exports.findByEmail = async (email) => {
    try {
        return await User.findOne({ email })
    } catch (error) {
        console.log(error)
        return new Error(error.message);
    }
}

module.exports.findAll = async (id) => {
    try {
        const users = await User.find({ _id: {$ne: id}}).select([
            "email",
            "username",
            "isAvatarImage",
            "_id",
        ])
        return users;
    } catch (error) {
        console.log(error)
        return new Error(error.message);
    }
}

module.exports.create = async ( userInfo ) => {
    try {
        const user = await User.create({ 
            username: userInfo.username,
            email: userInfo.email,
            password: userInfo.password
         })
        return user
    } catch (error) {
        console.log(error)
        return new Error(error.message);
    }
}

module.exports.update = async (id,avatarImage) => {
    try {
        const userDate = await User.findByIdAndUpdate(id,{
            isAvatarImageSet: true,
            isAvatarImage:avatarImage,
        }, {new : true})
        return userDate
    } catch (error) {
        console.log(error)
        return new Error(error.message);
    }
}