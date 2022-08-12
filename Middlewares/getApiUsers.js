const User = require("../models/User");

const getApiUsers = (request, response) => {
    const id = request.params.id;
    User.findById(id)
        .then(user => {
            if (user) {
                response.json(user);
            } else {
                response.status(404).end();
            }
        })
        .catch(error => {
            console.log(error.message);
            response.status(400).end();
        });
};

module.exports = getApiUsers;