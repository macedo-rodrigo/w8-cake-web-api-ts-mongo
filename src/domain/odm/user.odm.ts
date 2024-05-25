
import { User, IUser } from "../entities/user-entity";
import { Document } from "mongoose";

const getAllUsers = async (page: number, limit: number): Promise<any> => {
  return await User.find()
    .limit(limit)
    .skip((page - 1) * limit);
};

const getUserCount = async (): Promise<number> => {
  return await User.countDocuments();
};

const getUserById = async (id: string): Promise<Document<IUser> | null> => {
  return await User.findById(id);
};

const getUserByEmailWithPassword = async (email: string): Promise<Document<IUser> | null> => {
  const user: Document<IUser> | null = await User.findOne({ email }).select("+password") as any;
  return user;
};

const getUserByName = async (name: string): Promise<Document<IUser>[]> => {
  return await User.find({ firstName: new RegExp("^" + name.toLowerCase(), "i") });
};

const createUser = async (userData: any): Promise<Document<IUser>> => {
  const user = new User(userData);
  const document: Document<IUser> = (await user.save()) as any;

  return document;
};

const deleteUser = async (id: string): Promise<Document<IUser> | null> => {
  return await User.findByIdAndDelete(id);
};

const updateUser = async (id: string, userData: any): Promise<Document<IUser> | null> => {
  return await User.findByIdAndUpdate(id, userData, { new: true, runValidators: true });
};

export const userOdm = {
  getAllUsers,
  getUserCount,
  getUserById,
  getUserByEmailWithPassword,
  getUserByName,
  createUser,
  deleteUser,
  updateUser,
};
