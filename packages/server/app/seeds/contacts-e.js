const e = require("../1-e.json");
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries

  return knex("contacts").insert(e);
};
