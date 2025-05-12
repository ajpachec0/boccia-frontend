// auth.ts
import { api } from "@/config/axios-config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credenciales Boccia",
      credentials: {
        email: { label: "Correo", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(creds) {
        // 1) Modo desarrollo: credenciales mock
        // if (
        //   process.env.NODE_ENV === "development" &&
        //   creds?.email === "demo@boccia.com" &&
        //   creds?.password === "demo123"
        // ) {
        //   return {
        //     id: "demo-id",
        //     name: "Usuario Demo",
        //     email: "demo@boccia.com",
        //     accessToken: "fake-demo-token",
        //   };
        // }

        // 2) Producción (o cuando tu API esté arriba): llama al endpoint real
        try {
          const res = await api.post(`${process.env.API_URL}/auth/login`, {
            email: creds?.email,
            password: creds?.password,
          });

          // Si la respuesta es exitosa, devuelve el usuario
          if (res.status === 200) {
            const data = res.data;
            return {
              id: data.username,
              name: data.username,
              email: data.email,
              accessToken: data.token,
            };
          }
          // const data = await res.json();

          // if (res.ok && data.token) {
          //   return {
          //     id: data.username,
          //     name: data.username,
          //     email: data.email,
          //     accessToken: data.token,
          //   };
          // }
        } catch (err) {
          console.error("Error al iniciar sesión:", err);
          // Manejo de errores: si la API no responde o hay un error, rechaza
          // el inicio de sesión
        }

        // 3) Si nada coincide, rechaza
        return null;
      },
    }),
  ],

  trustHost: true,
  pages: {
    signIn: "/login",
  },

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.accessToken = user.accessToken;
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        accessToken: token.accessToken as string,
      };
      return session;
    },
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },

  secret: process.env.AUTH_SECRET,
});
