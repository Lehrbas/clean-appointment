/*
  Using hashing algorithm argon2,
    it's great!
  Also we could use crypto module to generate a random salt and use a different salt
  for each password increasing security, but with the trade-off of having to hash and store
  the salts aswell, in this case I kept it simple because this is a PoC
*/

import * as argon2 from 'argon2';

export class PasswordHelper {
  public static async hashPassword(password: string): Promise<string> {
    if (typeof password !== 'string') {
      throw new Error('Password must be a string');
    }

    try {
      return await argon2.hash(password);
    } catch (error) {
      throw error;
    }
  }
}
