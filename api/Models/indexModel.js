import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    _id : Number,
    taskTxt : {
        type : String,
        trim : true,
        required : ["Task Text is Required", true]
    },
    status : Number,
    info : String
});

const taskSchemaModel = mongoose.model("ToDoNotes", taskSchema );

export default taskSchemaModel;