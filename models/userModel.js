const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
    }
})

