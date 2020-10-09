const axios = require("axios");
const fs = require("fs").promises;

const axiosThrottle = require("axios-throttle");
axiosThrottle.init(axios, 200);
const options = {
  method: "GET",
};
// axios.interceptors.request.use(req => {
//     // `req` is the Axios request config, so you can modify
//     // the `headers`.
//     req.headers.authorization = 'my secret token';
//     return req;
//   });
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

async function updateWithLatestCustomers() {
  return await hydrateAll();
}
function titleCase(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
}
async function hydrateAll() {
  const url = `/accounts?fields=accountName`;
  let { data } = await instance.get(
    "/accounts?wField=commercial&wValue=False&fields=accountID,address1,city,createdOn,email,firstName,phone1,phone2,zip,timeStamp&limit=100&pageIndex=1"
  );
  var pages = Math.floor(data.count / 100);
  pages += 2;
  var promises = [];

  for (var page = 0; page < pages; page++) {
    const url = `https://api.servicemonster.net/v1/accounts?fields=accountID,state,address1,accountName,city,createdOn,commercial,email,firstName,lastName,phone1,phone2,zip,timeStamp&limit=100&pageIndex=${page}`;
    options.url = url;
    promises.push(axiosThrottle.getRequestPromise(options, page));
  }

  var results = [];
  await axios.all(promises).then((responses) => {
    responses.forEach((group) => {
      var items = group.data.items;
      items.forEach((item) => {
        delete item.row_number;
        var ok = false;
        var phones = "";
        if (item.phone1 != undefined) {
          var phone1 = item.phone1.replace(/\D/g, "");
          if (phone1.length == 10 || phone1.length == 11) {
            //   delete item.phone1; /
            item.phone1 = phone1;
            // item.phones += phone1;
            // phones.push(phone1);
            ok = true;
          }
        }
        if (item.phone2 != undefined) {
          var phone2 = item.phone2.replace(/\D/g, "");
          if (phone2.length == 10 || phone2.length == 11) {
            // delete item.phone2;
            item.phone2 = phone2;
            // item.phones += phone2;

            // phones.push(phone2);
            ok = true;
          }
        }
        if (item.address1 != undefined) {
          item.street = titleCase(item.address1);
        } else {
          ok = false;
        }
        if (item.firstName != undefined) {
          item.firstName = titleCase(item.firstName);
        }

        if (item.lastName != undefined) {
          item.lastName = titleCase(item.lastName);
        }
        if (item.city != undefined) {
          item.city = titleCase(item.city);
        } else {
          ok = false;
        }
        if (item.state != undefined) {
          item.state = titleCase(item.state);
        }
        if (item.email != undefined) {
          item.email = item.email.toLowerCase();
        }
        var address = `${item.address1}, ${item.city}, ${item.state} ${item.zip}`;
        // item.address = {
        //   street: item.street,
        //   city: item.city,
        //   state: item.state,
        //   zip: item.zip,
        // };
        delete item.address1;
        // delete item.street;
        // delete item.city;
        // delete item.state;
        // delete item.zip;
        item.prettyAddress = address;
        item.updatedAt = item.timeStamp;
        delete item.timeStamp;
        if (item.commercial) {
          item.companyName = titleCase(item.accountName);
        }
        delete item.accountName;
        if (ok) {
          var account = Object.assign({}, item);
          //   account.phones = phones;
          results.push(account);
        }
      });
    });
  });

  //   results.forEach((result) => {
  console.log(results.length);
  console.log(results[0]);

  var d = new Date();
  var t = d.getTime();
  //   console.log(t.toString());
  //   await fs.writeFile(t.toString() + ".json", JSON.stringify(results));
  //   // console.log(JSON.stringify(result.firstName));
  //   //   });
  //   console.log(results.length);
  //   // s
  var a = [];
  var b = [];
  var c = [];
  var d = [];
  var e = [];
  var f = [];
  var start = `exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex("contacts")
      .del()
      .then(function () {
        // Inserts seed entries
          return knex("contacts").insert(`;
  var end = `);
        });
    };
    `;
  //   await fs.writeFile(t.toString() + ".json", JSON.stringify(results));
  for (var i = 0; i < results.length; i++) {
    if (i <= 999) {
      a.push(results[i]);
    }
    if (i <= 3000 && i > 999) {
      b.push(results[i]);
    }
    if (i <= 5000 && i > 3000) {
      c.push(results[i]);
    }
    if (i <= 7000 && i > 5000) {
      d.push(results[i]);
    }
    if (i <= 9000 && i > 7000) {
      e.push(results[i]);
    }
    if (i > 9000) {
      f.push(results[i]);
    }
  }
  t = 1;
  await fs.writeFile(t.toString() + "-a.json", JSON.stringify(a));
  await fs.writeFile(t.toString() + "-b.json", JSON.stringify(b));
  await fs.writeFile(t.toString() + "-c.json", JSON.stringify(c));
  await fs.writeFile(t.toString() + "-d.json", JSON.stringify(d));
  await fs.writeFile(t.toString() + "-e.json", JSON.stringify(e));
  await fs.writeFile(t.toString() + "-f.json", JSON.stringify(f));
  return data.count;
}

updateWithLatestCustomers();
