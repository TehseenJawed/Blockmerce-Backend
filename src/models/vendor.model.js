const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const vendorSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  isActive: {
    type: Boolean,
    default: 0,
  },
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  shopName: {
    type: String,
    required: true,
    minLength: 3,
  },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
  ],
  bio: { type: String },
  website: { type: String, trim: true },
  phoneNumber: { type: String, required: true },
  profilePicture: { type: String },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    validate(value) {
      if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        throw new Error(
          "Password must contain at least one letter and one number"
        );
      }
    },
    private: true,
  },
  followerUser: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      default: [],
    },
  ],
  followerShop: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendor",
      required: true,
      default: [],
    },
  ],
  followingShop: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendor",
      required: true,
      default: [],
    },
  ],
  followingUser: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      default: [],
    },
  ],
  category: {
    type: String,
  },
  publicAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "address-detail",
  },
});

vendorSchema.plugin(paginate);
vendorSchema.plugin(toJSON);

vendorSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

vendorSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

vendorSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
const Vendor = mongoose.model("vendor", vendorSchema);

module.exports = Vendor;
