// import authConfig from "@/auth.config";
// import NextAuth from "next-auth";
// import { apiAuthPrefix,DEFAULT_LOGIN_REDIRECT,authRoutes, publicRoutes } from "@/routes";

// const{auth} = NextAuth(authConfig);

// export default auth((req)=>{
//   const{nextUrl} = req;
//   const isLoggedIn = !!req.auth;

//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  
//   if (isApiAuthRoute) {
//     return undefined;    
//   };
//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       return Response.redirect(new URL('/dashboard/admin',nextUrl))
//     }
//     return undefined;
//   };

//   if (!isLoggedIn && !isPublicRoute) {
//     return Response.redirect(new URL('/login',nextUrl));
//   }
//   return undefined;
// })
 
// // Optionally, don't invoke Middleware on some paths
// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// }       

// middleware.ts (excluding API routes from matcher entirely)
import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { apiAuthPrefix, DEFAULT_LOGIN_REDIRECT, authRoutes, publicRoutes, collectionsPrefix } from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isCollectionRoute = nextUrl.pathname.startsWith(collectionsPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Allow NextAuth API routes
  if (isApiAuthRoute) {
    return undefined;
  }

  if (isCollectionRoute) {
    return undefined;
  }

  // Handle auth routes
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return undefined;
  }

  // Protect all other routes
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/login', nextUrl));
  }

  return undefined;
});

export const config = {
  matcher: [
    // Match all routes except:
    // - API routes (completely excluded)
    // - Static files
    // - Next.js internals
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};