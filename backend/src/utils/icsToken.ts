import Bun from "bun";
import { SignJWT, jwtVerify } from "jose";

export async function generateIcsAccessToken(timetableId: string, userId: string) {
  const secret = new TextEncoder().encode(Bun.env.JWT_SECRET ?? "");
  return await new SignJWT({ tid: timetableId, uid: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1d")
    .sign(secret);
}

export async function verifyIcsAccessToken(token: string): Promise<{ tid: string; uid: string }> {
  const secret = new TextEncoder().encode(Bun.env.JWT_SECRET ?? "");
  const { payload } = await jwtVerify(token, secret);
  return payload as { tid: string; uid: string };
}