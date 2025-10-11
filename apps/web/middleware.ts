import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from '@/app/src/i18n/routing';

const i18nMiddleware = createMiddleware(routing);

export const middleware = (req: NextRequest) => {
  //i18n ก่อน (จัดการ locale)
  const response = i18nMiddleware(req);
  if (response) return response;

  //auth token
  const token = req.cookies.get('token')?.value;
  if (!token && !req.nextUrl.pathname.startsWith('/')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  return NextResponse.next();
};

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)', //negative lookahead not into these api paths
};
