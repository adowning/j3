const a = require("../1-a.json");
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("contacts")
    .del()
    .then(function () {
      return knex("contacts").insert(a);
    });
};
