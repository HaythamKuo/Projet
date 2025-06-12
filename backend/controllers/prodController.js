import asyncHandler from "express-async-handler";
import prodModel from "../models/prodModel.js";

//之後會寫api串到ikimage藉此上傳照片
export const addNewProd = asyncHandler(async (req, res) => {
  const { name, price, description, category, stock, images, rate } = req.body;

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
    rate,
  });

  res.status(201).json({
    _id: newProd._id,
    name: newProd.name,
    price: newProd.price,
    description: newProd.description,
    category: newProd.category,
    stock: newProd.stock,
    rate: newProd.rate,
    images: newProd.images,
    createdAt: newProd.createdAt,
  });
});

export const getAllProds = asyncHandler(async (req, res) => {
  const products = await prodModel.find({});

  if (products.length === 0) {
    res.status(400);
    throw new Error("沒有產品");
  }

  res.status(200).json(products);
});
