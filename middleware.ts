import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { apiAuthPrefix,DEFAULT_LOGIN_REDIRECT,authRoutes, publicRoutes } from "@/routes";

const{auth} = NextAuth(authConfig);

export default auth((req)=>{
  const{nextUrl} = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  
  if (isApiAuthRoute) {
    return undefined;    
  };
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL('/settings',nextUrl))
    }
    return undefined;
  };

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/login',nextUrl));
  }
  return undefined;
})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}       