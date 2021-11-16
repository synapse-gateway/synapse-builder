import axios from "axios";

const apiClient = {
  createConfig(sources) {
    return axios
      .post(
        "http://localhost:4005/api/config",
        { sources },
        {
          headers: {
            authorization: `bearer ${jwt}`,
          },
        }
      )
      .then((res) => console.log("Sources sent!"));
  },
  async getTimeData(jwt, sinceUnixTime, minutesSince = 5) {
    let queryString = sinceUnixTime
      ? `?since=${sinceUnixTime}`
      : `?minutes=${minutesSince}`;

    let response = await axios.get(
      `http://localhost:4005/api/monitor/queries${queryString}`,
      {
        headers: {
          authorization: `bearer ${jwt}`,
        },
      }
    );
    return response;
  },
  async signupUser(user) {
    try {
      let response = await axios.post("http://localhost:4005/api/users", user);
      return response.data;
    } catch (err) {
      return { error: "All fields are required and must use unique username" };
    }
  },
  async loginUser(user) {
    try {
      let response = await axios.post(
        "http://localhost:4005/api/users/login",
        user
      );
      return response.data;
    } catch (err) {
      return {
        error: "Username/password combination failed. Please try again.",
      };
    }
  },
};

export default apiClient;
