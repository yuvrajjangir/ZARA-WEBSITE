const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
    email: {type: String},
    password: {type: String},
    name: {type: String},
    phone: {type: Number}
})

const AuthModel = mongoose.model("auth",authSchema);


module.exports={
    AuthModel
}