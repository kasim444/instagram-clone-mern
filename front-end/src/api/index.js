import axios from 'axios'

const API = axios.create({
  baseURL: 'https://instagram-mern-stack.herokuapp.com/',
})

export default API
