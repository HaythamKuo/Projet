import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import asyncHandler from "express-async-handler";
import { Storage } from "@google-cloud/storage";
import prodModel from "../models/prodModel.js";
import {
  editProdSchemaFn,
  createProdSchemaFn,
} from "../middlewares/joiValidation.js";
import { selectedRuleSchema } from "../middlewares/categoryValidation.js";

//const keyFilePath = path.resolve(process.env.KEY_FILE_PATH);

//const storage = new Storage({ keyFilename: keyFilePath });
const storage = new Storage();
const buck = storage.bucket(process.env.BUCKET_NAME);

export const uploadProd = asyncHandler(async (req, res) => {
  let { name, price, description, rate, mainCategory, subCategory, size } =
    req.body;

  try {
    if (typeof size === "string") {
      size = JSON.parse(size);
    }
  } catch (error) {
    res.status(400);
    throw new Error(error || "size格式出錯");
  }

  const { error } = createProdSchemaFn({
    name,
    price,
    description,
    size,
    rate,
  });

  if (error) {
    const messages = error.details.map((e) => e.message);
    res.status(400);
    throw new Error(messages.join(" / "));
  }

  const { error: categoryErr } = selectedRuleSchema.validate(
    {
      mainCategory,
      subCategory,
    },
    { abortEarly: false }
  );

  if (categoryErr) {
    res.status(400);
    throw new Error(categoryErr);
  }

  if (!req.files || req.files.length === 0) {
    res.status(400);
    throw new Error("未上傳圖片或圖片格式錯誤");
  }

  const imageUrl = req.files.map((file) => ({
    url: file.linkUrl,
    alt: file.originalname.split(".")[0] || "",
  }));

  const newProduct = await prodModel.create({
    name,
    price,
    description,
    mainCategory,
    subCategory,
    size,
    rate,
    createdBy: req.user._id,
    images: imageUrl,
  });

  res.status(201).json({
    _id: newProduct._id,
    name: newProduct.name,
    price: newProduct.price,
    description: newProduct.description,
    mainCategory: newProduct.mainCategory,
    subCategory: newProduct.subCategory,
    size: newProduct.size,
    rate: newProduct.rate,
    images: newProduct.images,
    createdBy: newProduct.createdBy,
    createdAt: newProduct.createdAt,
  });

  //除錯專用

  // res.status(201).json({
  //   name,
  //   price,
  //   description,
  //   size,
  //   rate,
  // });
});

export const getAllProds = asyncHandler(async (req, res) => {
  const products = await prodModel.find();

  if (!products || products.length === 0) {
    res.status(404);
    throw new Error("沒有找到商品或是發生了一些錯誤");
  }

  res.status(200).json(products);
});

//待修正
export const getSpecificProd = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("商品 ID 格式錯誤");
  }

  const prod = await prodModel.findById(id);

  if (!prod) {
    res.status(404);
    throw new Error("無此商品");
  }

  res.status(200).json(prod);
});

export const getMyProds = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const prods = await prodModel.find({ createdBy: userId });

  if (!prods || prods.length === 0) throw new Error("無產品");

  res.status(201).json(prods);
});

export const editMyProd = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    price,
    description,
    oldImages,
    mainCategory,
    subCategory,
    size,
  } = req.body;

  const prod = await prodModel.findById(id);

  //console.log(req.body);

  if (!prod) {
    res.status(404);
    throw new Error("無此產品或是發生了一些錯誤");
  }

  const { error: optionErr } = selectedRuleSchema.validate({
    mainCategory,
    subCategory,
  });
  if (optionErr) {
    res.status(400);
    throw new Error(optionErr);
  }

  let parseImgs = [];
  try {
    parseImgs = JSON.parse(oldImages || "[]");
    if (!Array.isArray(parseImgs)) throw new Error("似乎不是陣列");
  } catch (error) {
    res.status(400);
    throw new Error("oldImages 格式錯誤，請傳入 JSON 陣列");
  }

  let sizeObj;
  try {
    sizeObj = JSON.parse(size);
  } catch (error) {
    res.status(400);
    throw new Error("size 格式錯誤，請傳入有效的 JSON 物件字串");
  }

  const purePrice = +price;
  //console.log(sizeObj);

  const dataToValidate = {
    name,
    price: purePrice,
    description,
    size: sizeObj,
    oldImages: parseImgs,
  };

  const { error } = editProdSchemaFn(dataToValidate);

  //console.log(error);

  if (error) {
    const messages = error.details.map((e) => e.message);
    res.status(400);
    throw new Error(messages.join(" / "));
  }

  const newImageUrl = req.files.map((file) => ({
    url: file.linkUrl,
    alt: file.originalname.split(".")[0] || "",
  }));

  const finalImgs = [...parseImgs, ...newImageUrl];

  prod.name = dataToValidate.name;
  prod.price = dataToValidate.price;
  prod.description = dataToValidate.description;
  prod.size = dataToValidate.size;
  prod.mainCategory = mainCategory;
  prod.subCategory = subCategory;
  prod.images = finalImgs;

  //console.log(prod);

  await prod.save();
  res.status(200).json("編輯成功");
});

export const deleteMyProd = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await prodModel.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("無此產品");
  }

  //product.images -> 是陣列
  const cloudImgs = product.images;
  if (cloudImgs.length === 0) {
    res.status(404);
    throw new Error("沒有雲端圖片");
  } else {
    for (const img of cloudImgs) {
      if (img.url) {
        try {
          const imgObj = new URL(img.url);

          const gcBuckName = "doll-project";

          let fileName = imgObj.pathname.replace(/^\/+/, "");

          fileName = decodeURIComponent(fileName);

          if (fileName.startsWith(`${gcBuckName}/`)) {
            fileName = fileName.slice(gcBuckName.length + 1);
          }

          await buck.file(fileName).delete();
        } catch (error) {
          console.error(error?.message || "GCS刪除圖片過程中發生了一些錯誤");
        }
      }
    }
  }

  const deleteRes = await prodModel.deleteOne({ _id: product._id });

  if (deleteRes.deletedCount === 0) {
    res.status(400);
    throw new Error("產品未找到 無法刪除");
  }

  res.status(200).json("刪除成功");
});

export const searchProds = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query) {
    throw new Error(看來沒有query);
  }
  try {
    const result = await prodModel
      .find({ $text: { $search: query } }, { score: { $meta: "textScore" } })
      .sort({ score: { $meta: "textScore" } });

    res.json(result);
  } catch (error) {
    res.status(500);
    throw new Error("搜索時發生一些問題");
  }
});
