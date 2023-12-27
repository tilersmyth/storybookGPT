import { fetchAuthSession } from 'aws-amplify/auth/server';
import { NextRequest, NextResponse } from 'next/server';

import { runWithAmplifyServerContext } from '@/utils/server-utils';

const NON_AUTH_ROUTES = ['/sign-in', '/sign-up', '/sign-up-confirm'];

const isNonAuthRoute = (pathname: string) =>
  NON_AUTH_ROUTES.some((route) => pathname.startsWith(route));

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        return session.tokens !== undefined;
      } catch (error) {
        return false;
      }
    },
  });

  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/provider-redirect')) {
    return response;
  }

  if (isNonAuthRoute(pathname) && authenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!isNonAuthRoute(pathname) && !authenticated) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
