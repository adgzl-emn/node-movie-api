const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    username: {
        type: String,
        require: true,
        minLength: 3,
        unique: true
    },
    password: {
        type: String,
        minLength: 4
    }
});

module.exports = mongoose.model('user',UserSchema);