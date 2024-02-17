import UserModel, { UserDocument, UserInput } from '../models/user.model';
import { Document, FilterQuery } from 'mongoose';
import { omit } from 'lodash';
// export async function createUser(input: Document<UserDocument>) {
//   try {
//     return await UserModel.create(input);
//   } catch (error) {
//     throw new Error(error);
//   }
// }

export async function createUser(input: UserInput) {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), 'password');
  } catch (e: any) {
    throw new Error(e);
  }
}
interface ValidatePasswordInput {
  email: string;
  password: string;
}
export async function validatePassword(input: ValidatePasswordInput) {
  /* try {
    const user = await UserModel.findOne({ email });
    if (!user) return false;
    const isvalid = await user.comparePassword(password);
    if (!isvalid) return false;
    return omit(user.toJSON(), 'password');
  } catch (error: any) {
    throw new Error(error);
  } */
  const { email, password } = input;
  const user = await UserModel.findOne({ email: email });
  if (!user) return false;
  const isvalid = await user.comparePassword(password);
  if (!isvalid) return false;
  return omit(user.toJSON(), 'password');
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}
