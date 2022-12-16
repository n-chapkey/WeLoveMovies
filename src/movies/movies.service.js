const knex = require("../db/connection");

function list() {
  return knex("movies as m").select("m.*");
}

function listShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .groupBy("m.movie_id")
    .where("mt.is_showing", true);
}

function read(movie_id) {
  return knex("movies as m")
  .select("m.*")
  .where({ "m.movie_id": movie_id })
  .first();
}

function listTheatersByMovie(movie_id){
    return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .where({"m.movie_id" : movie_id})
}


module.exports = {
  list,
  listShowing,
  read,
  listTheatersByMovie
};
