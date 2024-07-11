import { GlobalApiResponse } from '@/types';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const POST = () => {
  const cookieStore = cookies();

  cookieStore.set('isLoggedIn', 'true', {
    // set path to root, so the cookie is valid for all PAGE_ROUTES
    path: '/',
    // set the cookie to expire in 1 week
    maxAge: 60 * 60 * 24 * 7,
    // don't allow the cookie to be read from JavaScript
    secure: true,
    // only allow cookies to be transmitted over HTTPS
    httpOnly: true,
  });

  return NextResponse.json<GlobalApiResponse>({
    success: true,
    data: { message: 'Sign In Successful', result: undefined },
  });
};
