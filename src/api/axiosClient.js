import axios from 'axios'
import { base_products } from './config'

const axiosClient  = axios.create({
    baseURL:base_products
})

export default axiosClient