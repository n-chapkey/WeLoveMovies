const knex = require("../db/connection");

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*");
}
function read(review_id) {
  return knex("reviews as r")
    .select("r.*")
    .where({ "r.review_id": review_id })
    .first();
}

function readCritic(critic_id){
    return knex("critics as c")
    .select("*")
    .where({"c.critic_id" : critic_id})
    .first();
}

function destroy(review_id){
    return knex("reviews")
    .where({review_id})
    .del();
}

function listReviewsByMovie(movie_id){
    return knex("reviews as r")
    .join("movies as m", "m.movie_id", "r.movie_id")
    .where({"r.movie_id" : movie_id})

}

module.exports = {
  update,
  read,
  readCritic,
  delete:destroy,
  list: listReviewsByMovie
};
