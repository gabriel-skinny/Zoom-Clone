"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const user = await currentUser();

  if (!user) throw new Error("User it not logged in");
  if (!apiKey || !apiSecret) throw new Error("Missing Stream credentials");

  const streamClient = new StreamClient(apiKey, apiSecret);
  // validity is optional (by default the token is valid for an hour)
  const vailidity = 60 * 60;
  const issued = Math.floor(Date.now() / 1000) - 60;

  const token = streamClient.generateUserToken({
    user_id: user.id,
    validity_in_seconds: vailidity,
    iat: issued,
  });

  return token;
};
