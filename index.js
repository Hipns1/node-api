/* eslint-disable no-unused-vars */
require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("./loggerMiddleware");
const cors = require("cors");
require("./mongo");
app.use(cors());
app.use(express.json());
app.use(logger);
const User = require("./models/User");

//ruta principal
app.get("/", (request, response) => {
    response.send("<h1>Hello world</h1>");
});

//get de todos los usuarios
app.get("/api/users", (request, response) => {
    User.find({}).then(users => {
        response.json(users);
    });
});

//get de un usuario en especifico
app.get("/api/users/:id", (request, response) => {
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
});

//delete de un usuario en especifico
app.delete("/api/users/:id", (request, response) => {
    const id = request.params.id;
    User.findByIdAndRemove(id)
        .then(user => {
            response.status(204).end();
        })
        .catch(error => {
            console.log(error.message);
            response.status(400).end();
        });
});

//pos de un nuevo usuario
app.post("/api/users", (request, response) => {
    const user = request.body;

    if (!user.name || !user.email) {
        response.status(400).json({
            error: "Name and email are required"
        });
    }

    const newUser = new User({
        name: user.name,
        email: user.email
    });
    newUser.save().then((savedUser) => {
        response.json(savedUser);
    });
});

//put pra editar un usuario especifico
app.put("/api/users/:id", (request, response) => {
    const id = request.params.id;
    const updateUser = {
        name: request.body.name,
        email: request.body.email
    };
    User.findByIdAndUpdate(id, updateUser, { new: true })
        .then(user => {
            response.json(user);
        }).catch(error => {
            console.log(error.message);
            response.status(400).end();
        });
});

//configuracion del puerto
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});