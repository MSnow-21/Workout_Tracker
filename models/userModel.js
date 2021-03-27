const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    day: {
        type: Date,
        default: Date.now,
    },
    exercises:[
        {
            type:{
                type: String,
            },
            name:{
                type: String,
            },
            duration: {
                type:Number,
            },
        
    }]
});

