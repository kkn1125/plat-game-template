import crypto from "crypto";

export const createPassword = (
  pw: string,
  iteration?: number,
  salt?: string
) => {
  if (!salt) salt = crypto.randomBytes(16).toString("hex");
  if (!iteration) iteration = Math.floor(Math.random() * 50000) + 50000;
  const keylen = 64;
  const pbkdf2 = crypto.pbkdf2Sync(pw, salt, iteration, keylen, "sha512");
  return {
    iteration,
    salt,
    pbkdf2: pbkdf2.toString("hex"),
  };
};
