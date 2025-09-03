import { NextIntlClientProvider, hasLocale } from 'next-intl';
import type { Metadata } from 'next';
import { routing } from '@src/i18n/routing';
import { getMessages } from 'next-intl/server';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import '@src/shared/style/globals.css';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});
export const metadata: Metadata = {
  title: 'RanAHLite',
  description: 'One website , Many Stores',
};

export default async function LocaleLayer({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });
  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
