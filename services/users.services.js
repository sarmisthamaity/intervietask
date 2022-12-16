const userModel = require('../models/user.models');

const searchUser = async(query) => {

    const result = await userModel.find(query);
    return result;
}

const editServices = async(data, token) => {
    const updateUseById = await userModel.findOneAndUpdate(
        {_id: token.userId},
        { $set: data},
        { returnOriginal: false, runValidators: true }
        )

    return updateUseById

}

module.exports = {
    searchUser,
    editServices
}

