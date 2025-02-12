import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      username: string;
      mission: number;
      hints1used?: number;
      hints2used?: number;
      hints3used?: number;
    } & DefaultSession["user"];
  }
}
