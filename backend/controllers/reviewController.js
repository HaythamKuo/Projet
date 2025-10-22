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

  console.log(reviews);

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
});

export const getReviews = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  //console.log(orderId);

  if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
    res.status(400);
    throw new Error("orderId 無效或缺失");
  }

  const allReviews = await reviewModal.find({ orderId }).lean();

  //console.log(allReviews);

  res.status(200).json(allReviews);
});

export const fetchGroupReviews = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const specificGroups = await reviewModal
    .find({ productId })
    // 要新增照片欄位
    .populate("userId", "name")
    .sort({ createdAt: -1 });

  //待除錯
  // if (!specificGroups || specificGroups.length === 0) {
  //   res.json([]);
  //   throw new Error("無評論或是抓取失敗");
  // }

  res.json(specificGroups || []);
});
