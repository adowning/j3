const b = require("../1-b.json");
exports.seed = function (knex, Promise) {
  return knex("contacts").insert(b);
};
