const GetRequest = (url) => {
  const axios = require("axios");
  return axios
    .get(url)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log("error", error);
    });
};
export default GetRequest;
