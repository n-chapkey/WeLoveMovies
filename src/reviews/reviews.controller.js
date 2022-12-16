const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const review = await reviewsService.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({
    status: 404,
    message: `Review ${req.params.reviewId} cannot be found.`,
  });
}

async function destroy(req, res, next) {
  const { review } = res.locals;
  await reviewsService.delete(review.review_id);
  res.sendStatus(204);
}

async function list(req, res, next) {
  const reviewsData = await reviewsService.list(req.params.movieId);

  const dataWithCritics = await Promise.all(
    reviewsData.map(async (review) => {
      const criticData = await reviewsService.readCritic(review.critic_id);
      return { ...review, critic: criticData };
    })
  );

  const data = dataWithCritics;
  res.json({ data });
}

async function update(req, res, next) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  await reviewsService.update(updatedReview);
  const reviewsData = await reviewsService.read(req.params.reviewId);

  const criticData = await reviewsService.readCritic(reviewsData.critic_id);
  const data = { ...reviewsData, critic: criticData };
  res.json({ data });
}

module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  list: asyncErrorBoundary(list),
};
