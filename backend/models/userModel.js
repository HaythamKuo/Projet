import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "請輸入姓名"],
      maxLength: 50,
      minLength: 2,
    },
    email: {
      type: String,
      required: [true, "請輸入郵件"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "請輸入密碼"],
      maxLength: 20,
      minLength: 6,
      match: [/^[a-zA-Z0-9]+$/, "密碼只能包含英文字母與數字，不得含特殊符號"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
