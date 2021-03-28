const express = require("express");
const logger = require("logger");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require('./models');

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/exercisedb", { useNewUrlParser: true});

app.get("/", function (req,res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/exercise", function(req,res){
    res.sendFile(path.join(__dirname,"exercise.html"));
});

app.get("/stats", function(req,res){
    res.sendFile(path.join(__dirname, "stats.html"));
});









app.listen(PORT, function(){
    console.log("App listening on PORT " + PORT);
});
