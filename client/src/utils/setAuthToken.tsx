import axios from "axios";
const setAuthToken = (token: string, googleEmail: string) => {
  if (token) {
    if (token.length > 500 && googleEmail) {
      axios.defaults.headers.common[
        "authorization"
      ] = `Bearer ${token}&${googleEmail}`;
    } else {
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    }
  } else {
    delete axios.defaults.headers.common["authorization"];
  }
};

export default setAuthToken;
