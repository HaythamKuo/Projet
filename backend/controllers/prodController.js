import asyncHandler from "express-async-handler";
import prodModel from "../models/prodModel.js";

export const uploadProd = asyncHandler(async (req, res) => {
  const { name, price, description, category, stock, rate } = req.body;

  if (!name || !price || !description) {
    res.status(400);
    throw new Error("請提供 name, price, description, category 等欄位");
  }

  if (!req.file || !req.file.linkUrl) {
    res.status(400);
    throw new Error("未上傳圖片或圖片格式錯誤");
  }

  const imageUrl = req.file.linkUrl;

  const newProduct = await prodModel.create({
    name,
    price,
    description,
    category,
    stock,
    rate,
    images: imageUrl,
  });

  res.status(201).json({
    _id: newProduct._id,
    name: newProduct.name,
    price: +newProduct.price,
    description: newProduct.description,
    category: newProduct.category,
    stock: +newProduct.stock,
    rate: +newProduct.rate,
    images: newProduct.images,
    createdAt: newProduct.createdAt,
  });
});

export const getAllProds = asyncHandler(async (req, res) => {
  const products = await prodModel.find();

  if (!products || products.length === 0) {
    res.status(404);
    throw new Error("沒有找到商品或是發生了一些錯誤");
  }

  res.status(200).json(products);
});
