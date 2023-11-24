import axios from "axios";
import base_url from "../../utils/Url";
import { config } from "../../utils/axiosConfig";

const createEnquiryService = async(contactData)=>{
    const response =await axios.post(`${base_url}enquiry/createEnquiry`,contactData,config)
    return response.data
}


const contactServices = {
    createEnquiryService
}

export default contactServices