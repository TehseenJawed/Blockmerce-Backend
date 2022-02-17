const httpStatus = require("http-status");
const { Post, Colour } = require("../models");
const ApiError = require("../utils/APIError");

const queryPost = async (
  filter,
  options,
  populateFirst = "shop",
  populateSecond = {
    path: "product",
    model: "product",
    populate: {
      path: "productCondition",
      model: "product_condition",
      populate: {
        path: "product_condition",
        populate: {
          path: "colour",
          model: "colour",
          populate: {
            path: "colour",
          },
        },
      },
    },
  }
) => {
  const post = await Post.paginate(
    filter,
    options,
    populateFirst,
    populateSecond
  );
  const colours = await Colour.find();
  post.colours = colours;
  return post;
  //   console.log("wow");
  //   return "wow";
};
const getPostById = async (id) => {
  const post = await Post.findById(id)
    .populate({
      path: "product",
      populate: [
        {
          path: "productCondition",
          populate: {
            path: "product_condition",
          },
        },
      ],
    })
    .populate("shop");
  if (!post) {
    throw new ApiError(httpStatus.ACCEPTED, "no such post Exist");
  }
  return post;
};

const updatePostById = async (id, body) => {
  const post = await Post.findByIdAndUpdate(id, body, {
    new: true,
  });
  return post;
};
const createPost = async (body) => {
  const post = await Post.create(body);
  return post;
};
const deletePostById = async (id) => {
  await getPostById(id);
  const post = await Post.findByIdAndDelete(id);
  return post;
};
module.exports = {
  createPost,
  queryPost,
  updatePostById,
  getPostById,
  deletePostById,
};
