import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    title : {
        type : 'string',
        required : true,
    },
    body : {
        type : 'string',
        required : true,
    },
    user : {
        type : 'string',
        required : true,
    }
},{
    versionKey : false
})


const noteModel = mongoose.model('note', noteSchema);

export { noteModel}