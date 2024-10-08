import Blog from "../model/blog.model.js";

export const getAllBlogs = async(req,res)=>{
    try {
        const {search,category,location} = req.query;
        console.log(search);

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
            console.log("...query",query);
            
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

export const deleteBlog = async(req,res)=>{
    try {
        const id =req.params.id;
        const blog = await Blog.findByIdAndDelete(id);
        if(!blog){
            return res.status(404).json({message:`cannot find any blog with id ${id}`});
        }
        return res.status(200).json({message:'blog deleted successfully',blog});
    } catch (error) {
        return res.status(500).json({err:error});
    }
}

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
        return res.status(200).json({message:'blog fetched successfully',blog});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({err:error.message})
    }
}