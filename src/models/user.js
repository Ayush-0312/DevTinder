const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 20,
      trim: true,
    },

    lastName: {
      type: String,
      maxLength: 20,
      trim: true,
    },

    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email not valid:" + value);
        }
      },
    },

    password: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      min: 18,
    },

    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: `{VALUE} is not a valid gender type`,
      },
      //custom validation function
      // validate(value) {
      //   if (!["male", "female", "others"].includes(value)) {
      //     throw new Error("Gender data is not valid");
      //   }
      // },
    },

    photos: {
      type: [String],
      default: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYgizZqMv5a7Qo5ZXvwKCHeRsslPrArnCZ4g&s",
      ],
      validate: {
        validator(value) {
          if (value.length === 0) {
            throw new Error("At least one photo is required");
          }

          if (value.length > 5) {
            throw new Error("Maximum 5 photos allowed");
          }

          for (const url of value) {
            if (!validator.isURL(url)) {
              throw new Error("Invalid photo URL: " + url);
            }
          }

          return true;
        },
      },
    },

    about: {
      type: String,
      default: "Default about section",
      maxLength: 200,
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    github: {
      type: String,
      trim: true,
      validate(value) {
        if (value && !validator.isURL(value)) {
          throw new Error("Invalid GitHub URL");
        }
      },
    },

    linkedIn: {
      type: String,
      trim: true,
      validate(value) {
        if (value && !validator.isURL(value)) {
          throw new Error("Invalid LinkedIn URL");
        }
      },
    },

    portfolio: {
      type: String,
      trim: true,
      validate(value) {
        if (value && !validator.isURL(value)) {
          throw new Error("Invalid Portfolio URL");
        }
      },
    },
  },
  {
    timestamps: true,
  },
);

//don't use arrow function here because the code breaks as this keyword only works with older function
userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash,
  );
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
