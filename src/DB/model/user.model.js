import mongoose, { model, Schema, Types } from "mongoose";

const gendertype = { male: "male", female: "female" };
const Roletype = { Member: "Member", Admin: "Admin" };
export const userschema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 40,
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
  },
  { timestamps: true },
);

export const usermodel = mongoose.models.User || model("User", userschema);
