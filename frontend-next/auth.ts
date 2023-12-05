// "use server";

// import NextAuth, { User } from "next-auth";
// import { authConfig } from "./auth.config";
// import Credentials from "next-auth/providers/credentials";
// import { z } from "zod";
// import { login } from "@/app/lib/http/auth";
// import { cookies } from "next/headers";

// export const { auth, signIn, signOut } = NextAuth({
//   ...authConfig,
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const isOnFiles = nextUrl.pathname.startsWith("/files");
//       if (isOnFiles) {
//         return isLoggedIn;
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL("/files", nextUrl));
//       }
//       return true;
//     },
//     jwt: (async (token: any, user: any) => {
//       // Add access_token to the token object
//       if (user) {
//         token.accessToken = user.access_token;
//       }
//       return token;
//     }) as any,
//     session: ((session: any, token: any)  => {
//       // Add access_token to the session object
//       session.accessToken = token.accessToken;
//       return session;
//     }) as any,
//   },
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         console.log({ credentials });
//         const parsedCredentials = z
//           .object({
//             email: z.string().email(),
//             password: z.string().min(6),
//           })
//           .safeParse(credentials);
//         console.log({ parsedCredentials });
//         if (parsedCredentials.success) {
//           const { email, password } = parsedCredentials.data;
//           const token = await login(email, password);
//           console.log({ token });
//           if (!token || !token.access_token) return null;
//           return token;
//         }

//         console.log("Invalid credentials");
//         return null;
//       },
//     }),
//   ],
// });
