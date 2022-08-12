const User = require("../models/User");

const getUser = (request, response) => {
    User.find({}).then(users => {
        response.json(users);
    });
};

module.exports = getUser;