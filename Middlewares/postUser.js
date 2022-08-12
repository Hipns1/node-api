const User = require("../models/User");

const postUser = (request, response) => {
    const user = request.body;

    if (!user.name || !user.email || !user.password) {
        response.status(400).json({
            error: "Name and email are required"
        });
    }

    const newUser = new User({
        name: user.name,
        email: user.email,
        password: user.password,
    });
    newUser.save().then((savedUser) => {
        response.json(savedUser);
    });
};

module.exports = postUser;