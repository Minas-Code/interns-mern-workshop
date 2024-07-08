import { GlobalApiResponse } from '@/types';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const POST = () => {
  const cookieStore = cookies();

  cookieStore.set('isLoggedIn', 'true');

  return NextResponse.json<GlobalApiResponse>({ success: true, data: { message: 'Sign In Successful', result: undefined } });
};
