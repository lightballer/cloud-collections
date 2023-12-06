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
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const protectedPaths = ["/", "/files"];
  const isPathProtected = protectedPaths?.some((path) => pathname == path);
  const res = NextResponse.next();
  console.log({ res, isPathProtected });
  if (isPathProtected) {
    const token = await getToken({ req });
    console.log({ token });
    if (!token) {
      const url = new URL(`/login`, req.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }
  return res;
}
