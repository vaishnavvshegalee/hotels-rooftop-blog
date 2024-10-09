import Comment from "../model/comment.model.js";

// get all comments count
export const getAllComments = async(req,res)=>{
    try {
        const totalComments = await Comment.countDocuments({});
        
        if(!totalComments){
            return res.status(404).json({message:'cannot find any comments'});
        }
        return res.status(200).json({message:'comments are fetched successfully',totalComments});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({err:error.message})
    }
}

// create a comment
export const createComment = async(req,res)=>{
    try {
        // const {comment,user,post,} = req.body;
        const newComment = await new Comment(req.body);
        if(!newComment){
            return res.status(400).json({message:'Something went wrong!'});
        }
        await newComment.save();
        return res.status(201).json({message:'comment created successfully.',newComment})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({err:error.message});
    }
}