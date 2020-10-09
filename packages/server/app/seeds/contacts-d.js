const d = require("../1-d.json");
exports.seed = function (knex, Promise) {
  return knex("contacts").insert(d);
};
