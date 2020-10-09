const axios = require("axios");
const Strapi = require("strapi-sdk-javascript");
const strapi = new Strapi.default("http://localhost:1337");
const AxiosLogger = require("axios-logger");

const fs = require("fs").promises;
const axiosThrottle = require("axios-throttle");
axiosThrottle.init(axios, 200);
const options = {
  method: "GET",
};
const COUNT_GROUP = 1000;

axios.interceptors.request.use(AxiosLogger.requestLogger);

axios.defaults.headers.common["Authorization"] =
  "Basic a0drYU9XeEQ6VkF0emhNVG91ZW1VbDN3";
async function updateWithLatestWorkorders() {
  try {
    await strapi.login("asdf@asdf.com", "Asdfasdf1234!");
  } catch (e) {
    console.log(JSON.stringify(e.message));
  }
  const contacts = await strapi.getEntries("contacts", { _limit: 13000 });
  var promises = [];
  for (var contact = COUNT_GROUP - 1000; contact < COUNT_GROUP; contact++) {
    const url = `https://api.servicemonster.net/v1/accounts/${contacts[contact].accountID}/orders`;
    options.url = url;
    promises.push(axiosThrottle.getRequestPromise(options, contact));
  }
  var orderList = [];
  console.log(promises.length);
  await axios.all(promises).then(async (responses) => {
    responses.forEach((group) => {
      var orders = group.data.items;
      orders.forEach((order) => {
        orderList.push(order);
        console.log(order);
      });
    });
  });
  await fs.writeFile(COUNT_GROUP + ".json", JSON.stringify(orderList));
}
// updateWithLatestWorkorders();

async function createStrapiWorkorders() {
  const orders = require("../test.json");
  console.log(orders.length);
  var limit = 5;
  var i = 0;
  for (var rawOrder of orders) {
    // if (i > limit) {
    //   break;
    // }
    var contactArray;
    try {
      contactArray = await strapi.getEntries("contacts", {
        accountID: rawOrder.accountID,
      });
    } catch (e) {
      console.log("first", JSON.stringify(e.message));
    }

    const contact = contactArray[0];

    rawOrder.contact = contact.id;
    // console.log(rawOrder.accountID);
    // console.log(rawOrder.contact);
    if (contact.id == undefined) {
      break;
    }
    var order;
    try {
      order = await strapi.createEntry("workorders", rawOrder);
    } catch (e) {
      console.log("second", JSON.stringify(e.message));
    }
    if (order.id == undefined) {
      break;
    }
    var orderList = contact.workorders;
    const companyName = contact.companyName;
    if (orderList != undefined) {
      for (var _order of orderList) {
        if (order.orderID == _order.orderID) {
          console.log("dupe");
        } else {
          orderList.push(order.id);
        }
      }
    } else {
      orderList = [];
      orderList.push(order.id);
    }
    var updatedContact;
    try {
      updatedContact = await strapi.updateEntry("contacts", contact.id, {
        workorders: orderList,
      });
      console.log(updatedContact.id);
    } catch (e) {
      console.log("third", JSON.stringify(e.message));
    }

    // console.log(updatedContact.workorders);
    i++;
  }
  // 'http://localhost:1337/contacts?accountID=ad3ba7d3-6b47-11e4-9204-d311f53f44a4'
  // for (var order of orders) {

  // }
  // const contact = await strapi.getEntries("contacts", {
  //   accountID: "ad3ba7d3-6b47-11e4-9204-d311f53f44a4",
  // });
  // console.log(contact);
}

// createStrapiWorkorders();

async function convertToInHouse() {
  const orders = await strapi.getEntries("workorders", {
    inHouse: true,
    _limit: 10000,
  });
  console.log(orders.length);
  for (var order of orders) {
    const updatedOrder = await strapi.updateEntry("workorders", order.id, {
      inHouse: true,
    });
  }
}
// convertToInHouse();

async function correctDueDate() {
  const orders = await strapi.getEntries("workorders", {
    inHouse: true,
    _limit: 10000,
  });
  console.log(orders.length);
  for (var order of orders) {
    var dateCreated = order.dateCreated;
    let numWeeks = 3;
    let now = new Date(dateCreated);
    now.setDate(now.getDate() + numWeeks * 7);
    console.log(dateCreated, " ", now);
    const updatedOrder = await strapi.updateEntry("workorders", order.id, {
      dueDate: now,
    });
  }
}

correctDueDate();
