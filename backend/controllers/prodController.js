import asyncHandler from "express-async-handler";
import prodModel from "../models/prodModel.js";

export const addNewProd = asyncHandler(async (req, res) => {
  const { name, price, description, category, stock, images } = req.body;

  if (!name || !price || !description || !category) {
    res.status(400);
    throw new Error("請提供 name, price, description, category 等欄位");
  }

  const newProd = await prodModel.create({
    name,
    price,
    description,
    category,
    stock,
    images,
  });

  res.status(201).json({
    _id: newProd._id,
    name: newProd.name,
    price: newProd.price,
    description: newProd.description,
    category: newProd.category,
    stock: newProd.stock,
    images: newProd.images,
    createdAt: newProd.createdAt,
  });
});
