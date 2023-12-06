import { login } from "@/app/lib/http/auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

export const authOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        // console.log({ credentials });
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);
        // console.log({ parsedCredentials });
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const token = await login(email, password);
          // console.log({ token });
          if (!token || !token.access_token) return null;
          return token;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: (async ({ token, user }: any) => {
      return { ...token, ...user };
    }) as any,
    session: (({ session, token }: any) => {
      session.user = token as any;
      return session;
    }) as any,
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
