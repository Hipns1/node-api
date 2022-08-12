/* eslint-disable no-unused-vars */
require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("./Middlewares/loggerMiddleware");
const cors = require("cors");
require("./mongo");
app.use(cors());
app.use(express.json());
app.use(logger);

//importacion de middlewares
const User = require("./models/User");
const getUser = require("./Middlewares/getUser");
const getApiUsers = require("./Middlewares/getApiUsers");
const deleteUser = require("./Middlewares/deleteUser");
const postUser = require("./Middlewares/postUser");
const updateUser = require("./Middlewares/updateUser");

//get de todos los usuarios
app.get("/api/users", getUser);

//get de un usuario en especifico
app.get("/api/users/:id", getApiUsers);

//delete de un usuario en especifico
app.delete("/api/users/:id", deleteUser);

//pos de un nuevo usuario
app.post("/api/users", postUser);

//put para editar un usuario especifico
app.put("/api/users/:id", updateUser);

//configuracion del puerto
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});