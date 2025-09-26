import asyncHandler from "express-async-handler";

export const submitReviews = asyncHandler(async (req, res) => {
  console.log(req.body);
});
