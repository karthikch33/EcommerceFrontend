import axios from 'axios'
import base_url from '../../utils/Url'
import {config} from '../../utils/axiosConfig'
import { toast } from 'react-toastify'

const registerService = async (userData)=>{
    const response = await axios.post(`${base_url}user/register`,userData)
    return response.data
}

const userLoginService = async (loginData)=>{
    const response = await axios.post(`${base_url}user/login`,{
        email:loginData?.email,
        password:loginData?.password
    })
    return response.data
}

const getWishlistService = async(userId)=>{
    let response;
    if(localStorage.getItem('user'))
     response = await axios.get(`${base_url}user/getwishlist/${userId}`,config)
    
    return response.data
}

const getCompareItemsService = async(userId)=>{
    let response;
    if(localStorage.getItem('user'))
     response = await axios.get(`${base_url}user/getallcompareitems/${userId}`)
   
    return response.data
}

const emptyEntireCartService = async()=>{
    const response = await axios.delete(`${base_url}user/emptyentirecart`,config)
    return response.data
}


const addcompareItemService = async(userId)=>{
    let response;
    if(localStorage.getItem('user'))
     response = await axios.put(`${base_url}user/addcompareitem/${userId}`,{},config)
    else
    toast.error("Login Required")
    return response.data
}

const addToCartService = async(CartDataAddition)=>{
    let response;
    if(localStorage.getItem('user'))
     response = await axios.post(`${base_url}user/cart`,CartDataAddition,config)
    else
    toast.error("Login Required")
    return response.data
}

const getCartService = async(userId)=>{
    let response;
    if(localStorage.getItem('user'))
     response = await axios.get(`${base_url}user/getcart/${userId}`,config)
    
    return response.data
}

const emptyCartService = async(productId)=>{
    const response = await axios.delete(`${base_url}user/emptycart/${productId}`,config)
    return response.data
}

const createOrder = async(orderData)=>{
    const response = await axios.post(`${base_url}user/createorder`,orderData,config)
    return response.data
}

const updateUserService = async(updatedData)=>{
    const response = await axios.put(`${base_url}user/updateuser`,updatedData,config)
    return response.data
}

const getUserService = async(updatedData)=>{
    const response = await axios.get(`${base_url}user/getuser`,config)
    return response.data
}

const forgotPasswordTokenService = async(emailSearch)=>{
    const response = await axios.post(`${base_url}user/forgotpassword`,emailSearch)
    return response.data
}

const resetPasswordService = async(TokenAndPassword)=>{
    const response = await axios.put(`${base_url}user/resetpassword/${TokenAndPassword?.token}`,{
        password:TokenAndPassword?.password
    })
    return response.data
}

const userServices= {
    registerService,
    userLoginService,
    getWishlistService,
    getCompareItemsService,
    addcompareItemService,
    addToCartService,
    getCartService,
    emptyCartService,
    createOrder,
    getUserService,
    emptyEntireCartService,
    updateUserService,
    forgotPasswordTokenService,
    resetPasswordService
}

export default userServices