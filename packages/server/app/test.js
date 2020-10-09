
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

module.exports.updateWithLatestCustomers = async () => {
            const customers = await hydrateAll()
};


async function hydrateAll() {
  const url = `/accounts?fields=id,accountName`;
    let { data } = await instance.get(url)
    const { count } = await instance.get(url);
    const countb = data.count
    console.log(count, countb)
    return count
}

 updateWithLatestCustomers()