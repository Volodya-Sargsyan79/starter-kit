import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Set your API base URL
  timeout: 1000, // Set a timeout if needed
  headers: { 'Content-Type': 'application/json' },
})

export default instance