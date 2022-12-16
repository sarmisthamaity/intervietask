const mongoose = require('mongoose');

// const options = {
//     versionKey: false,
//     timestamps: {
//       createdAt: true,
//       updatedAt: 'modifiedAt',
//     },
// };

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    uodatedAt: {
        type: Date,
        default: Date.now
    }

});

const userModel = new mongoose.model('users', userSchema);

module.exports = userModel;
