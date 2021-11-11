import axios from "axios";

const apiClient = {
  createConfig(sources) {
    return axios
      .post("http://localhost:5000/api/config", { sources })
      .then(res => console.log("Sources sent!"));
  }
};

export default apiClient;