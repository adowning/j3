const c = require("../1-c.json");
exports.seed = function (knex, Promise) {
  return knex("contacts").insert(c);
};
