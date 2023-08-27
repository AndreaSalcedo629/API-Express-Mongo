const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const AuthorRouter = require("./router/AuthorRouter");
const BookRouter = require("./router/BookRouter")

app.use(express.json({extended:true}));
app.use(express.urlencoded());

//Enrutado
app.use("/api", AuthorRouter);
app.use("/api", BookRouter);

//Conexion de la base de datos
const URL = process.env.MONGO_DB

mongoose
    .connect(URL,{})
    .then(()=> {
        console.log("DB is connected");
    })
    .catch((err)=>{
        console.log(err);
    });

app.listen(5000, () =>{
    console.log("Server is running on port 5000")
});

