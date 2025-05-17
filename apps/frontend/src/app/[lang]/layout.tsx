import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from './components/navigation';
import { getDictionary } from './dictionaries';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang as 'en' | 'ru');

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
  };
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ru' }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const dict = await getDictionary(params.lang as 'en' | 'ru');

  return (
    <div className={inter.className}>
      <Navigation lang={params.lang as 'en' | 'ru'} dictionary={dict} />
      <main className="container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-gray-100 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          © {new Date().getFullYear()} НИИ онкологии им. Михаила Давыдова
        </div>
      </footer>
    </div>
  );
}
