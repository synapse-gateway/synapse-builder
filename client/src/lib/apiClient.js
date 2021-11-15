import axios from "axios";

const apiClient = {
  createConfig(sources) {
    return axios
      .post("http://localhost:4005/api/config", { sources })
      .then((res) => console.log("Sources sent!"));
  },
  async getTimeData() {
    console.log("getting time data...");
    let response = await axios.get(
      "http://localhost:4005/api/monitor/queries",
      {
        headers: {
          authorization:
            "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjE5Mjc5MzUzMWU2NzdhYzQwNWU2OTgzIiwiaWF0IjoxNjM2OTg5MjM3LCJleHAiOjE2MzcwMjUyMzd9.6g3ecEGG1-_8u7OyNEYG6pogWmay7XlhXd4Kjebrbis",
          queryMinutes: 43800,
        },
      }
    );
    return response;
  },
};

export default apiClient;
