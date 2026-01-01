import bcrypt from "bcrypt";

export const hashPassword = (plain: string): Promise<string> => {
  return bcrypt.hash(plain, 12);
};

export const comparePassword = (
  plain: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(plain, hash);
};
