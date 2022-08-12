/* eslint-disable no-unused-vars */
const User = require("../models/User");

const deleteUser = (request, response) => {
    const id = request.params.id;
    User.findByIdAndRemove(id)
        .then(user => {
            response.status(204).end();
        })
        .catch(error => {
            console.log(error.message);
            response.status(400).end();
        });
};
module.exports = deleteUser;