import Blog from "../model/blog.model.js";
import Comment from "../model/comment.model.js";

// get all the blogs
export const getAllBlogs = async(req,res)=>{
    try {
        const {search,category,location} = req.query;

        let query = {};
        if(search){
            query = {
                ...query,
                $or:[
                    {title:{$regex:search,$options:"i"}},
                    {content:{$regex:search,$options:"i"}}
                ]
            }
        }
        if(category){
            query ={
                ...query,
                category
            }
            console.log("...query",query);
        }

        if(location){
            query={
                ...query,
                location
            }
        }
        const blogs = await Blog.find(query).sort({createdAt:-1});
        console.log('blogs',blogs);
        
        if(!blogs || blogs.length === 0){
            return res.status(404).json({message:'Cannot find any blog!'});
        }
        return res.status(200).json({message:'blog fetched successfully',blogs});
    } catch (error) {
       return res.status(500).json({err:error.message});
    }
}

// create a blog post
export const createBlog = async(req,res)=>{
    try {
        const {title,description,content,coverImg,category,author,rating} = req.body;
        const blog = await Blog.create({
            title,description,content,coverImg,category,author,rating
        });
        if(!blog){
            return res.status(400).status({message:'Something went wrong!!'});
        }
        await blog.save();
        return res.status(201).json({message:'blog created successfully',blog});
    } catch (error) {
        return res.status(500).json({err:error});
    }
}

// delete ablog post
export const deleteBlog = async(req,res)=>{
    try {
        const id =req.params.id;
        const blog = await Blog.findByIdAndDelete(id);
        if(!blog){
            return res.status(404).json({message:`cannot find any blog with id ${id}`});
        }
        const deleteComment = await Comment.deleteMany({post:id});
        console.log(deleteComment);
        
        return res.status(200).json({message:'blog deleted successfully',blog});
    } catch (error) {
        return res.status(500).json({err:error.message});
    }
}

// update a blog post
export const updateBlog  = async(req,res)=>{
    try {
        const id = req.params.id;
        const {title,description,content,coverImg,category,author,rating,createdAt} = req.body;
        const blog =  await Blog.findByIdAndUpdate(id,{
            title,description,content,coverImg,category,author,rating,createdAt
        },{new:true});
        if(!blog){
            return res.status(400).json({message:'Something went wrong! cannot update the blog'});
        }
        return res.status(200).json({message:'blog update successfully.',blog})
    } catch (error) {
        console.log("error occured: ",error);
        return res.status(500).json({err:error});
    }
}

// get single blog by id
export const getBlog = async(req,res)=>{
    try {
        const {id} = req.params;
        const blog = await Blog.findById(id);
        console.log(id);
        
        if(!blog){
            return res.status(404).json({message:`Cannot find any blog with id ${id}`});
        }
        
        // related comment
        const comment = await Comment.find({id}).populate('user','username email')
        return res.status(200).json({message:'blog fetched successfully',Post:blog,Comments:comment});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({err:error.message})
    }
}

// related post
export const relatedPost = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({message:'id is required!'});
        }
        const blog = await Blog.findById(id);
        if(!blog){
            return res.status(404).json({message:'cannot find any blog'})
        }
        const titleRegex = new RegExp(blog.title.split(' ').join('|'),'i');
        const relatedQuery = {
            _id:{$ne:id}, //exclude the current blog by id
            title:{$regex:titleRegex}
        }
        const relatedPost = await Blog.find(relatedQuery);
        if(!relatedPost){
            return res.status(404).json({message:'cannot find any blog'})
        }
        return res.status(200).json({message:'fetched matching blogs',relatedPost});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({err:error.message})
    }
}