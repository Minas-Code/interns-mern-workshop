import { GlobalApiResponse } from '@/types';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const POST = () => {
  const cookieStore = cookies();

  cookieStore.delete('isLoggedIn');

  NextResponse.json<GlobalApiResponse>({ success: true, data: { message: 'Sign Out Successful', result: undefined } });
};
