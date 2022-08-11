/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const connectionString = process.env.MONGO_DB_URI;

//conexion a mongodb
mongoose.connect(connectionString)
    .then(() => {
        console.log("Conexión a MongoDB correcta");
    }).catch(err => {
        console.log("Error al conectar a MongoDB");
    });
