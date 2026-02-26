import jwt from "jsonwebtoken";

export function signToken() {
  return jwt.sign({ role: "admin" }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return null;
  }
}