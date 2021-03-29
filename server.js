const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require('./models');

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true});

// HTML Routes

app.get("/", function (req,res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/exercise", function(req,res){
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", function(req,res){
    res.sendFile(path.join(__dirname, "./public/stats.html"));
});


//API Routes

//Get request to find all workouts.

app.get("/api/workouts", (req,res) => {
    db.Workout.find({})
      .then(dbWorkout => {
          res.json(dbWorkout);nod
      })
      .catch(err => {
          res.json(err);
      });
})

// Post route to add another workout.

app.post("/api/workouts", ({body},res) =>{
    db.Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});





app.listen(PORT, function(){
    console.log("App listening on PORT " + PORT);
});
