import UserModel from "../models/UserModel.js";
import { createHash, isValidPassword } from "../utils/crypt.js";
import { decodeToken, generateToken } from "../utils/jwt.js";

export default class UserManager {
  async registerUser(user) {
    const { email, name, password, subsList } = user;
    if (!email || !name || !password) {
      throw new Error("Missing required fields");
    }
    const newUser = {
      email,
      name,
      password: createHash(password),
      subsList,
    };
    try {
      const response = await UserModel.create(newUser);
      if (!response) {
        throw new Error("Error creating user");
      }
      return {
        message: "User created successfully",
      };
    } catch (error) {
      throw error;
    }
  }

  async loginUser(user) {
    const { email, password } = user;
    if (!email || !password) {
      throw new Error("Missing required fields");
    }
    try {
      const response = await UserModel.findOne({
        email: user.email,
      }).lean();
      if (!response) {
        throw new Error("User not found");
      }
      if (!isValidPassword(password, response.password)) {
        throw new Error("Invalid password");
      }

      const { name, email, _id, data } = response;
      const userToReturn = {
        name,
        email,
        _id,
        data,
      };

      const token = generateToken(userToReturn);
      return {
        message: "User logged in successfully",
        token: token,
      };
    } catch (error) {
      throw error;
    }
  }

  async getUser(token) {
    try {
      const user = decodeToken(token);
      const response = await UserModel.findById(user._id)
        .populate("subsList")
        .lean();
      if (!response) {
        throw new Error("User not found");
      }
      const { name, email, _id, subsList } = response;
      const userToReturn = {
        name,
        email,
        _id,
        subsList,
      };
      return userToReturn;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(token, newData) {
    try {
      const user = decodeToken(token);
      const response = await UserModel.findByIdAndUpdate(user._id, newData, {
        new: true,
      }).lean();
      if (!response) {
        throw new Error("User not found");
      }
      const { name, email, _id } = response;
      const userToReturn = {
        name,
        email,
        _id,
      };
      return {
        message: "User updated successfully",
        user: userToReturn,
      };
    } catch (error) {
      throw error;
    }
  }
}
