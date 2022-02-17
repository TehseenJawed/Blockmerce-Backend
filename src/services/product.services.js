const httpStatus = require("http-status");
const { Product, Vendor } = require("../models");
const { findByIdAndUpdate, create } = require("../models/user.model");
const ApiError = require("../utils/APIError");
const mongoose = require("mongoose");
const queryProducts = async (
  filter,
  options,
  populateFirst = "productCondition",
  populateSecond = null
) => {
  const products = Product.paginate(
    filter,
    options,
    populateFirst,
    populateSecond
  );
  return products;
};
const getProductById = async (id) => {
  return Product.findById(id).populate("productCondition");
};

const getAllProducts = async () => {
  const user = await Product.find();
  return user;
};

const updateProductById = async (id, update) => {
  const product = await getProductById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found.");
  }
  Object.assign(product, update);
  await product.save();
  return product;
};
const createProduct = async (body) => {
  const product = await Product.create(body);
  return product;
};
const deleteProductById = async (id) => {
  const product = await getProductById(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found.");
  }
  await product.remove();
  return product;
};

const getProductConditionByColorAndSize = async (body) => {
  const productId = mongoose.Types.ObjectId(body.productId);
  const colour = mongoose.Types.ObjectId(body.colourId);
  console.log(productId, "<===PId");
  console.log(colour, "<===CId");
  console.log(body.size, "SIZE");

  const product = await Product.findById(productId).populate(
    "productCondition"
  );

  // const productCondition = await Product.aggregate([
  //   {
  //     $match: { _id: product },
  //   },
  //   // {
  //   //   $unwind: "$productCondition",
  //   // },
  //   {
  //     $lookup: {
  //       from: "product_conditions",
  //       as: "Conditions",
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: {
  //               $and: [
  //                 { $eq: ["$colour", colour] },
  //                 // { $eq: ["$size", body.size] },
  //               ],
  //             },
  //           },
  //         },
  //         // {
  //         //   $project: {
  //         //     hasSizes: { $in: ["$size", ["M", "S"]] },
  //         //   },
  //         // },
  //       ],
  //     },
  //   },
  // ]);
  // return product.productCondition;
  console.log(product, "<=== product Condition");
  const total = [];
  const size = body.size;
  await product.productCondition.map((product) => {
    for (let index = 0; index < size.length; index++) {
      if (size[index] == product.size && product.colour == body.colourId) {
        total.push(product);
      }
    }
  });
  return total;
};
module.exports = {
  createProduct,
  getAllProducts,
  queryProducts,
  updateProductById,
  getProductById,
  deleteProductById,
  getProductConditionByColorAndSize,
};
