import axios from "axios"
import base_url from "../../utils/Url"
import { config } from "../../utils/axiosConfig"

const getAllBlogsService = async()=>{
    const response = await axios.get(`${base_url}blog/getallblogs/`)
    return response.data
}

const getABlog = async(blogId)=>{
    const response =await axios.get(`${base_url}blog/getblog/${blogId}`,config)
    return response.data
}

const BlogServices = {
    getAllBlogsService,
    getABlog
}

export default BlogServices