import axios from 'axios'

const api=axios.create({
    baseURL:`http://localhost:4000/api`,
    withCredentials:true,
    timeout:20000,
})

export default api;