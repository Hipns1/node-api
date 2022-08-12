const { Schema, model } = require("mongoose");

//definir el esquema de la base de datos
const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    confirmPassword: String,
});

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

//definir el modelo de datos
const User = model("User", userSchema);

module.exports = User;
