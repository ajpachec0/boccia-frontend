// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth" {
  // 1. Extendemos lo que guarda `session.user`
  interface Session extends DefaultSession {
    user: {
      accessToken: string;
    } & DefaultSession["user"];
  }

  // 2. Extendemos la interfaz User que devuelve `authorize`
  interface User extends DefaultUser {
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  // 3. Extendemos el shape del JWT
  interface JWT extends NextAuthJWT {
    accessToken: string;
  }
}
