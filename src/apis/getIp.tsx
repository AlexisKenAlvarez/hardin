/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use server";
import { headers } from "next/headers";

export async function getIp() {
  const forwardedFor = (await headers()).get("x-forwarded-for");

  return forwardedFor;
}
