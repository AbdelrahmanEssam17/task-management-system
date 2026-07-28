import mongoose, { model, Schema, Types } from "mongoose";

const gendertype = { male: "male", female: "female" };
const Roletype = { Member: "Member", Admin: "Admin" };
export const userschema = new Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: true,
      minLength: 3,
      maxLength: 40,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 1024,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    DOB: Date,
    phone: String,
    image: String,
    gender: {
      type: String,
      enum: Object.values(gendertype),
      default: gendertype.male,
    },
    role: {
      type: String,
      enum: Object.values(Roletype),
      default: Roletype.Member,
    },
    profileImage: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

export const userModel = mongoose.models.User || model("User", userschema);
