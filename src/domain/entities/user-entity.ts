/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: user's first name
 *           example: Jonh
 *         lastName:
 *           type: string
 *           description: user's last name
 *           example: Doe
 *         username:
 *           type: string
 *           description: user's username
 *           example: rodri_macedo
 *         email:
 *           type: string
 *           description: user's email
 *           example: rodri@gmail.com
 *           format: email
 *         password:
 *           type: string
 *           description: user's password
 *           example: hags5&5gg
 *           format: password
 *       required:
 *         - firstName
 *         - lastName
 *         - username
 *         - email
 *         - password
 */

import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate: {
        validator: (text: string) => validator.isEmail(text),
        message: "Invalid email address",
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minLength: [8, "The password must be at least 8 characters long"],
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    // If the password was already encrypted, we do not encrypt it again.
    if (this.isModified("password")) {
      const saltRounds = 10;
      const passwordEncrypted = await bcrypt.hash(this.password, saltRounds);
      this.password = passwordEncrypted;
    }

    next();
  } catch (error: any) {
    next(error);
  }
});

export const User = mongoose.model<IUser>("User", userSchema);