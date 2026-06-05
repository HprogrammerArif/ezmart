import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";
import createMiddleware from 'next-intl/middleware';
import { routing } from './libs/I18nRouting';

const intlMiddleware = createMiddleware(routing);

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  user: [/^\/user/, /^\/create-shop/],
  admin: [/^\/admin/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  
  // Strip locale from pathname for auth logic
  const pathnameWithoutLocale = pathname.replace(/^\/(en|bn)/, '') || '/';

  const userInfo = await getCurrentUser();

  if (!userInfo) {
    if (authRoutes.includes(pathnameWithoutLocale)) {
      return intlMiddleware(request);
    } 
    
    // Check if the route is a protected route
    let isProtectedRoute = false;
    for (const role in roleBasedPrivateRoutes) {
      if (roleBasedPrivateRoutes[role as Role].some(route => pathnameWithoutLocale.match(route))) {
        isProtectedRoute = true;
        break;
      }
    }

    if (isProtectedRoute) {
       return NextResponse.redirect(
        new URL(
          `/login?redirectPath=${pathnameWithoutLocale}`,
          request.url
        )
      );
    }
    
    return intlMiddleware(request);
  }

  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
    if (routes.some((route) => pathnameWithoutLocale.match(route))) {
      return intlMiddleware(request);
    }
  }

  // If user is logged in but tries to access a protected route they don't have access to
  let isProtectedRoute = false;
  for (const role in roleBasedPrivateRoutes) {
    if (roleBasedPrivateRoutes[role as Role].some(route => pathnameWithoutLocale.match(route))) {
      isProtectedRoute = true;
      break;
    }
  }

  if (isProtectedRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return intlMiddleware(request);
};

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
