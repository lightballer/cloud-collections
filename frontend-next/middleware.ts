// import { withAuth } from "next-auth/middleware";

// export default withAuth(function middleware(req) {}, {
//   callbacks: {
//     authorized: ({ req, token }) => {
//       console.log({ nextUrl: req.nextUrl, token });

//       const isOnFiles = req.nextUrl.pathname.startsWith("/files");
//       const isLoggedIn = !!token;

//       if (isOnFiles) {
//         return isLoggedIn;
//       } else if (isLoggedIn) {
//         return Response.redirect(`${req.nextUrl.origin}/files`);
//         // return Response.redirect(new URL('/files', req.nextUrl));
//       }
//       return true;
//     },
//   },
// });

// export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL("/login", request.url));
// }

// export { default } from "next-auth/middleware";

// export const config = {
//     matcher: ["/((?!login|_axiom|_api|_next/static|_next/image).*)"],
//   // matcher: ["/files"],
// };
// export const config = {
// //   matcher: ["/files"],
//   matcher: ["/(?!(?:register|login)?$)"]
// //   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };

// middleware.ts

// import { withAuth } from "next-auth/middleware";

// export default withAuth(
//   function middleware(req) {
//     console.log(req.nextauth.token);
//   },
//   {
//     callbacks: {
//       authorized: ({ token, req }) => {
//         console.log({ token, req });
//         return !!token;
//       },
//     },
//   }
// );

// export const config = { matcher: ["/files"] };

import { withAuth } from "next-auth/middleware";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export { default } from "next-auth/middleware";

// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   function middleware(req, token) {},
//   {
//     callbacks: {
//       authorized: (params) => {
//         // console.log({ params });
//         const { token } = params;
//         const isLoggedIn = !!token;
//         const isOnFiles = params.req.nextUrl.pathname.startsWith("/files");
//         if (isOnFiles) {
//           return isLoggedIn; // Redirect unauthenticated users to login page
//         } else if (isLoggedIn) {
//           console.log("logged in but not on files");
//           const response = NextResponse.redirect(
//             `${params.req.nextUrl.origin}/files`
//           );
//           // console.log({ response });
//           // window.location.replace('/files');
//           // redirect('/files');
//           return true;
//         }
//         return true;
//       },
//     },
//   }
// );

export const config = {
  matcher: ["/files"]
  // matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
