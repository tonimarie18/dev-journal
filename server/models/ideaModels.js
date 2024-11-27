import mongoose from "mongoose";

//Schema

const ideaSchema = new mongoose.Schema({


    title: {type: String, required: true},
    description: {type: String},
    collections: {type: [String], default:[]},
    timeSpent: {type: Number, default: 0},
    status: {
        type: String, 
        enum: ["Planned", "In Progress", "Completed"],
        default: "Planned"
    },
    priorityLevel: {
        type: String,
        enum: ["Low", "Medium", "High"], 
        default: "Medium"
    }

}, {timestamps: true});


//Model
const Idea = mongoose.model("Idea", ideaSchema);
export default Idea;
