const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    day: {
        type: Date,
        default: Date.now,
    },
    exercises:[
        {
            type:{
                type: String,
                trim: true,
                required: "Type is Required"
            },
            name:{
                type: String,
                trim: true,
                required: "Name is Required"
            },
            duration: {
                type: Number,
            },
            weight: {
                type: Number,
            },
            reps: {
                type: Number,
            },
            sets: {
                type: Number,
            }                    
    }]
});

const User = mongoose.model("User", UserSchema);

model.exports = User;