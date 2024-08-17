import axios from 'axios'

export const db = {
  users: [],
  
  async getUser() {
    const token = localStorage.getItem("token")
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/users/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })

      this.users = response.data
    } catch (error) {
      console.log(error.response || error)
    }
  },
}
