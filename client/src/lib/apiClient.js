import axios from "axios";

const apiClient = {
  createConfig(jwt, sources) {
    return axios
      .post(
        "api/config",
        { sources }
        // {
        //   headers: {
        //     authorization: `bearer ${jwt}`,
        //   },
        // }
      )
      .then((res) => {
        return res.status;
      });
  },
  async getTimeData(token, view, sinceUnixTime, minutesSince = 5) {
    let queryString = sinceUnixTime
      ? `?since=${sinceUnixTime}`
      : `?minutes=${minutesSince}`;

    let dataLookup = view === "Client Requests" ? "queries" : "resolvers";

    let response = await axios.get(`api/monitor/${dataLookup}${queryString}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return response;
  },
  async getQueryErrorData(token, hours = 24) {
    let queryString = `?hours=${hours}`;
    let response = await axios.get(`api/monitor/errors${queryString}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return response;
  },
  async signupUser(user) {
    try {
      let response = await axios.post("api/users", user);
      return response.data;
    } catch (err) {
      return { error: "All fields are required and must use unique username" };
    }
  },
  async loginUser(user) {
    try {
      let response = await axios.post("api/users/login", user);
      return response.data;
    } catch (err) {
      return {
        error: "Username/password combination failed. Please try again.",
      };
    }
  },
  async getAllUsers() {
    try {
      let response = await axios.get("api/users");
      return response.data;
    } catch (err) {
      return { error: "All fields are required and must use unique username" };
    }
  },
  async deleteUser(username) {
    try {
      let response = await axios.delete("api/users", { data: username });
      return response;
    } catch (err) {
      return { error: "All fields are required and must use unique username" };
    }
  },
};

export default apiClient;
