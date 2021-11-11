import axios from "axios";

const apiClient = {
  createConfig(sources) {
    return axios
      .post("http://localhost:4005/api/config", { sources })
      .then(res => console.log("Sources sent!"));
  },
  async getTimeData() {
    let response = await axios.get("http://localhost:4005/api/monitor")
    return response
  }
};

export default apiClient;