const { createHmac, randomBytes } = require("crypto");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/default.avif",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true },
);

// 🔐 Hash Password Before Save
userSchema.pre("save", async function () {
  const user = this;

  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString("hex");

  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  user.salt = salt;
  user.password = hashedPassword;
});

// 🔎 Match Password (Login)
userSchema.statics.matchPassword = async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) throw new Error("User not found");

  const userProvidedHash = createHmac("sha256", user.salt)
    .update(password)
    .digest("hex");

  if (user.password !== userProvidedHash) throw new Error("Incorrect Password");

  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.salt;

  return userObj;
};

const User = model("User", userSchema);

module.exports = User;
