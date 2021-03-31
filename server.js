const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require('./models');

console.log(db.Workout);

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
          res.json(dbWorkout);
      })
      .catch(err => {
          res.json(err);
      });
})

//Get request to find range with limit of 7 days - ref api.js line 38

app.get("/api/workouts/range", (req,res)=>{
    db.Workout.find({}).limit(7)
      .then(dbWorkout => {
          res.json(dbWorkout);
      })
      .catch(err => {
          res.json(err);
      })
})

// Post route to create a workout - ref api.js line 26

app.post("/api/workouts", ({body},res) =>{
    db.Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findOneAndUpdate({_id:req.params.id},{$push: {exercises:req.body}})
    // db.Workout.create(req.body)
    //     .then(({_id}) => db.Workout.findOneandUpdate({req.params.id}, {$push: {workout:_id}},{new: true}))
        .then(dbWorkout => {
            console.log(req.body);
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        })
})



app.listen(PORT, function(){
    console.log("App listening on PORT " + PORT);
});
