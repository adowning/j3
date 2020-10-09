const f = require("../1-f.json");
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  //   return knex("contacts")
  //     .del()
  //     .then(function () {
  return knex("contacts").insert(f);
};
//     );
// };
