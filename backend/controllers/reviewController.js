import asyncHandler from "express-async-handler";
import reviewModal from "../models/reviewModal.js";
import mongoose from "mongoose";

export const submitReviews = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const userId = req.user._id;

  const { orderId, reviews } = req.body;
  if (!reviews || reviews.length === 0 || !Array.isArray(reviews)) {
    throw new Error("至少要有一則評論");
  }

  //遍尋物件裡的comment至少有一則文字且不能超過20字

  //reviews.some(({comemt})=>comemt)
  const hasReviews = reviews.some(({ comment }) => comment?.trim().length > 0);
  const hasExceeded = reviews.every(
    ({ comment }) => comment.trim().length <= 20
  );
  //console.log(hasExceeded);

  if (!hasReviews || !hasExceeded) {
    throw new Error("至少要有一筆評論，且每則評論不能超過 20 字");
  }

  const reviewDocs = reviews.map(({ prodId, rank, comment }) => ({
    productId: prodId,
    userId,
    orderId,
    rating: rank ?? 1,
    comment,
  }));

  //  console.log(reviewDocs);
  await reviewModal.insertMany(reviewDocs);

  res.status(201).json(reviewDocs);

  // {
  //   orderId: '68c1324031e24052695f6458',
  //   reviews: [
  //     { prodId: '68c0f8d0f56f81c02793cdf6', rank: 1, comment: '' },
  //     { prodId: '68c1324031e24052695f6459', rank: 1, comment: 'asd' }
  //   ]
  // }
});

export const getReviews = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  //console.log(orderId);

  if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
    res.status(400);
    throw new Error("orderId 無效或缺失");
  }
  //只讀取不打算改動再存回 DB 就可以使用lean()
  const allReviews = await reviewModal.find({ orderId }).lean();

  //console.log(allReviews);

  // if (!allReviews || allReviews.length === 0) {
  //   res.status(404);
  //   throw new Error("無此商品的評論");
  // }
  res.status(200).json(allReviews);
});
