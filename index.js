/* eslint-disable no-unused-vars */
const express = require("express");
const app = express();
const logger = require("./loggerMiddleware");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(logger);

let users = [
    {
        id: 1,
        name: "Jesus",
        email: "jesudpf21@hotmail.com",
    },
    {
        id: 2,
        name: "Juan",
        email: "juan@hotmail.com",
    },
    {
        id: 3,
        name: "Pedro",
        email: "pedro@hotmail.com",
    },
    {
        id: 4,
        name: "Maria",
        email: "maria@hotmail.com",
    }
];

app.get("/", (request, response) => {
    response.send("<h1>Hello world</h1>");
});

app.get("/api/users", (request, response) => {
    response.json(users);
});

app.get("/api/users/:id", (request, response) => {
    const id = Number(request.params.id);
    const user = users.find(user => user.id == id);
    if (user) {
        response.json(user);
    } else {
        response.status(404).end();
    }
    
});

app.delete("/api/users/:id", (request, response) => {
    const id = Number(request.params.id);
    users = users.filter(user => user.id !== id);
    response.status(204).end();
});

app.post("/api/users", (request, response) => {
    const user = request.body;

    if (!user.name || !user.email) {
        response.status(400).json({
            error: "Name and email are required"
        });
    }

    const newUser = {
        id: users.length + 1,
        name: user.name,
        email: user.email
    };
    users = users.concat(newUser);
    response.json(newUser);
});

const port = 3001;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

//moongoose - mongoDB
//middlewares