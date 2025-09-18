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
    optionMail: { type: String },
    optionName: { type: String },
    password: {
      type: String,
      // required: [true, "請輸入密碼"],
      // maxLength: 20,
      // minLength: 6,
      //match: [/^[a-zA-Z0-9]+$/, "密碼只能包含英文字母與數字，不得含特殊符號"],
    },
    address: { type: String },
    googleId: { type: String, unique: true, sparse: true },
    authProvider: {
      type: String,
      enum: ["local", "google", "local+google"],
      default: "local",
    },
  },
  { timestamps: true }
);

//userController裡的註冊函式會觸發密碼雜湊
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel = mongoose.model("User", userSchema);
export default userModel;
