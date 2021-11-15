import axios from "axios";

const apiClient = {
  createConfig(sources) {
    return axios
      .post("http://localhost:4005/api/config", { sources }, {
        headers: {
          authorization: `bearer ${jwt}`
        }
      }).then(res => console.log("Sources sent!"));
  },
  async getTimeData(jwt) {
    console.log(jwt)
    let response = await axios.get("http://localhost:4005/api/monitor/queries", {
      headers: {
        authorization: `bearer ${jwt}`
      }
    })
    return response
  },
  async signupUser(user) {
    let response = await axios.post("http://localhost:4005/api/users", user)
    return response.data.token
  },
  async loginUser(user) {
    let response = await axios.post("http://localhost:4005/api/users/login", user)
    return response.data.token
  }
};

export default apiClient;