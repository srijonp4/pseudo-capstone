import UserModel, { UserDocument, UserInput } from '../models/user.model';
import { Document } from 'mongoose';

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
    return user;
  } catch (error) {
    throw error;
  }
}
