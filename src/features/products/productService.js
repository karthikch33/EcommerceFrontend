import axios from "axios"
import base_url from "../../utils/Url"
import {config} from "../../utils/axiosConfig"
import { toast } from "react-toastify"




const getAllProductService = async(data)=>{
  const response = await axios.get(`${base_url}product/getallproducts?${data?.brand?`brand=${data?.brand}&&`:''}${data?.tag?`tags=${data?.tag}&&`:''}${data.category?`category=${data?.category}&&`:''}${data.minPrice?`price[gte]=${data?.minPrice}&&`:''}${data.maxPrice?`price[lte]=${data?.maxPrice}&&`:''}${data?.sort?`sort=${data.sort}`:''}`)
    return response.data
}


const addToWishlistService = async (productId)=>{
    let response;
    if(localStorage.getItem('user'))
     response = await axios.put(`${base_url}product/wishlist`,{prodId:productId},config)
    else
    toast.error("Login Required")
    return response.data
}

const getProduct = async(productId)=>{
    const response = await axios.get(`${base_url}product/getproduct/${productId}`,config)
    return response.data
}


const productServices = {
    getAllProductService,
    addToWishlistService,
    getProduct
}

export default productServices