const User = require("../models/User");

const updateUser = (request, response) => {
    const id = request.params.id;
    const updateUser = {
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
    };
    User.findByIdAndUpdate(id, updateUser, { new: true })
        .then(user => {
            response.json(user);
        }).catch(error => {
            console.log(error.message);
            response.status(400).end();
        });
};

module.exports = updateUser;