//待刪除

import asyncHandler from "express-async-handler";

export const getGoals = asyncHandler((req, res) => {
  res.status(200).json({ mes: "we did it" });
});

export const postGoals = asyncHandler((req, res) => {
  res.status(200).json({ mes: "set goals" });
});

export const putGoals = asyncHandler((req, res) => {
  res.status(200).json({ mes: `modify goals it is ${req.params.id}` });
});

export const deleteGoals = asyncHandler((req, res) => {
  res.status(200).json({ mes: `delete goals it is ${req.params.id}` });
});
