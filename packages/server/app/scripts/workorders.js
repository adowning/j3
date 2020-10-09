const axios = require("axios");
const Strapi = require("strapi-sdk-javascript");
const strapi = new Strapi.default("http://localhost:1337");
const fs = require("fs").promises;
const axiosThrottle = require("axios-throttle");
axiosThrottle.init(axios, 200);
const options = {
  method: "GET",
};
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

async function updateWithLatestWorkorders() {
  console.log(strapi);
  try {
    await strapi.login("asdf@asdf.com", "Asdfasdf1234!");
  } catch (e) {
    console.log(e);
  }
  const contacts = await strapi.getEntries("contacts");
  console.log(contacts.length);
}
updateWithLatestWorkorders();
