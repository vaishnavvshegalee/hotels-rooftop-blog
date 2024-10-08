import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    content:String,
    coverImg:String,
    category:String,
    author:String,
    rating:Number,
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Blog = mongoose.model('Blog',blogSchema);
export default Blog;