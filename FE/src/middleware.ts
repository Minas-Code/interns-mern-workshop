import { API_ROUTES, PAGE_ROUTES } from '@/constants/API_ROUTES';
import { NextRequest, NextResponse } from 'next/server';

export const PUBLIC_PAGE_ROUTES: PAGE_ROUTES[] = [PAGE_ROUTES.SIGN_IN, PAGE_ROUTES.SIGN_UP];
export const PROTECTED_PAGE_ROUTES: PAGE_ROUTES[] = [
  PAGE_ROUTES.BASE,
  PAGE_ROUTES.TODOS_CREATE,
  PAGE_ROUTES.TODOS_LIST,
];

export const PUBLIC_API_ROUTES: API_ROUTES[] = [API_ROUTES.SIGN_IN];
export const PROTECTED_API_ROUTES: API_ROUTES[] = [API_ROUTES.SIGN_OUT];

export function middleware(req: NextRequest) {
  const isLoggedIn = !!req.cookies.get('isLoggedIn')?.value;
  const reqOrigin = req.cookies.get('reqOrigin')?.value || PAGE_ROUTES.BASE;
  const pageName = req.nextUrl.pathname as PAGE_ROUTES;
  const apiUrl = req.nextUrl.pathname as API_ROUTES;

  // PUBLIC PAGE ROUTES
  if (PUBLIC_PAGE_ROUTES.includes(pageName)) {
    // if user signed-up restrict access to sign-up page
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(reqOrigin, req.url));
    }
  }

  // PROTECTED PAGE ROUTES
  else if (PROTECTED_PAGE_ROUTES.includes(pageName)) {
    // if user is not signed-in
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL(PAGE_ROUTES.SIGN_IN, req.url));
    }

    // make todo-list default page
    if (pageName === PAGE_ROUTES.BASE) {
      return NextResponse.redirect(new URL(PAGE_ROUTES.TODOS_LIST, req.url));
    }
  }

  // PUBLIC API ROUTES
  if (PUBLIC_API_ROUTES.includes(apiUrl)) {
    // check if the request has isLoggedIn cookie
    if (isLoggedIn) {
      return NextResponse.json({ error: `You cannot use ${apiUrl} while logged in` }, { status: 403 }); // forbidden
    }
  }

  // PROTECTED API ROUTES
  if (PROTECTED_API_ROUTES.includes(apiUrl)) {
    // check if the request has isLoggedIn cookie
    if (!isLoggedIn) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); // unauthorized
    }
  }

  // saving request origin in cookie
  if ([...PUBLIC_PAGE_ROUTES, ...PROTECTED_PAGE_ROUTES].includes(pageName)) {
    const searchParams = req.nextUrl.searchParams.size > 0 ? `?${req.nextUrl.searchParams.toString()}` : '';
    const res = NextResponse.json({});

    res.cookies.set('reqOrigin', pageName + searchParams, {
      // set path to root, so the cookie is valid for all PAGE_ROUTES
      path: '/',
      // set the cookie to expire in 1 week
      maxAge: 60 * 60 * 24 * 7,
      // don't allow the cookie to be read from JavaScript
      secure: true,
      // only allow cookies to be transmitted over HTTPS
      httpOnly: true,
    });
  }
}
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
