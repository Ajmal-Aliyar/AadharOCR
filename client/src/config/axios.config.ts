import axios from 'axios'

const api=axios.create({
    baseURL:`https://aadhar-ocr-in91-backend.vercel.app/api`,
    withCredentials:true,
    timeout:20000,
})

export default api;