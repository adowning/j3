// @ts-nocheck
const axios = require("axios");
axios.defaults.headers.common["Authorization"] =
  "Basic a0drYU9XeEQ6VkF0emhNVG91ZW1VbDN3";
const instance = axios.create({
  baseURL: "https://api.servicemonster.net/v1",
  timeout: 1000,
  headers: {
    Authorization: "Basic a0drYU9XeEQ6VkF0emhNVG91ZW1VbDN3",
    "Content-Type": "application/json",
  },
});

module.exports = async () => {
    const url = `/accounts?wField=timeStamp&wValue=2019-01-01T00:00:01&wOperator=gt&Limit=5`;
  const { data } = await instance.get(url)

  console.log(data);
};
