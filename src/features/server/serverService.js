import axios from 'axios'
import base_url from "../../utils/Url"; 
const serverOnOrOff = async()=>{
    console.log('ji');
    const response = await axios.get(`${base_url}user/serveronoroff`)
    return response.data
}

const serverServices = {
    serverOnOrOff
}

export default serverServices