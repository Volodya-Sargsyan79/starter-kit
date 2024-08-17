import {inject} from "vue"

const axios = inject("axios")

export const db = {

  users: [], // Initial empty array to store users
  errors: [], // Array to store error messages

  // Function to log in and fetch users
  async getUser() {
    const token = localStorage.getItem("token")
    try {
      const response = await axios.get("/api/v1/users/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })

      // Set the users array with the response data
      this.users = response.data
    } catch (error) {
      // Store error message in the errors array
      this.errors.push(error.response ? error.response.data : error.message)
      console.error(error.response || error)
    }
  },
}