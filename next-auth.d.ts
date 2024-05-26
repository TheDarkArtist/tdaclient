import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      access: string;
      username: string;
    } & DefaultSession["user"];
  }
}
