const knex = require("../db/connection");

const tableName = "restaurants";

function averageRating() {
  return knex(tableName).avg("rating").as("average").first();
}

function count() {
  return knex(tableName).count("restaurant_id").first();
}

function create(newRestaurant) {
  return knex(tableName)
    .insert(newRestaurant, "*")
    .then((createdRecords) => createdRecords[0]);
}

function destroy(restaurant_id) {
  return knex(tableName).where({ restaurant_id }).del();
}

function list() {
  // your solution here
  return knex(tableName)
    .join("owners AS o", "o.owner_id", "=", `${tableName}.owner_id`)
    .select("o.email", "o.owner_name", `${tableName}.restaurant_name`)
    .orderBy("o.owner_name");
}

function listAverageRatingByOwner() {
  // your solution here
  return knex(`${tableName} AS r`)
    .join("owners AS o", "o.owner_id", "=", "r.owner_id")
    .select("o.owner_name")
    .avg("r.rating")
    .groupBy("o.owner_name");
}

function read(restaurant_id) {
  return knex(tableName).select("*").where({ restaurant_id }).first();
}

function readHighestRated() {
  return knex(tableName)
    .max("rating")
    .select("*")
    .groupBy("rating", "restaurant_id")
    .orderBy("rating", "desc")
    .first();
}

function update(updatedRestaurant) {
  return knex(tableName)
    .select("*")
    .where({ restaurant_id: updatedRestaurant.restaurant_id })
    .update(updatedRestaurant, "*");
}

module.exports = {
  averageRating,
  count,
  create,
  delete: destroy,
  list,
  listAverageRatingByOwner,
  read,
  readHighestRated,
  update,
};
