import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    // user:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'User'
    // },
    user:{
        type:String
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Comment = mongoose.model('Comment',commentSchema);

export default Comment;