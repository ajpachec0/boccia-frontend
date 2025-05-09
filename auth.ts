// auth.ts
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
        if (
          process.env.NODE_ENV === "development" &&
          creds?.email === "demo@boccia.com" &&
          creds?.password === "demo123"
        ) {
          return {
            id: "demo-id",
            name: "Usuario Demo",
            email: "demo@boccia.com",
            accessToken: "fake-demo-token",
          };
        }

        // 2) Producción (o cuando tu API esté arriba): llama al endpoint real
        try {
          const res = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: creds?.email,
              password: creds?.password,
            }),
          });
          const data = await res.json();
          if (res.ok && data.token) {
            return {
              id: data.username,
              name: data.username,
              email: data.email,
              accessToken: data.token,
            };
          }
        } catch (err) {
          console.error("Error al llamar al login real:", err);
        }

        // 3) Si nada coincide, rechaza
        return null;
      },
    }),
  ],
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
