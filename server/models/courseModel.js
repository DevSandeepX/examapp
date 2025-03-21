import mongoose from "mongoose";


const courseSchema = new mongoose.Schema({
    name:{type: String, required: true},
    code:{type: String, required: true},
    image:{type: String, required: true},
}, {timestamps: true})