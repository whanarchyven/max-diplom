'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../../../../public/images/logo.svg';

interface NavigationProps {
  lang: 'en' | 'ru';
  dictionary: {
    navigation: {
      home: string;
      news: string;
      about: string;
      contact: string;
    };
  };
}

export default function Navigation({ lang, dictionary }: NavigationProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get the path without the language prefix
  const pathnameWithoutLang = pathname.replace(`/${lang}`, '') || '/';

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Switch language
  const switchLanguage = (newLang: string) => {
    return `/${newLang}${pathnameWithoutLang === '/' ? '' : pathnameWithoutLang}`;
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href={`/${lang}`} className="text-xl font-bold text-gray-800">
              <Logo className="w-32 h-full" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href={`/${lang}`}
              className={`text-gray-600 hover:text-gray-900 ${pathname === `/${lang}` ? 'font-semibold' : ''}`}>
              {dictionary.navigation.home}
            </Link>
            <Link
              href={`/${lang}/news`}
              className={`text-gray-600 hover:text-gray-900 ${pathname.includes('/news') ? 'font-semibold' : ''}`}>
              {dictionary.navigation.news}
            </Link>
            <Link
              href={`/${lang}/about`}
              className={`text-gray-600 hover:text-gray-900 ${pathname.includes('/about') ? 'font-semibold' : ''}`}>
              {dictionary.navigation.about}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className={`text-gray-600 hover:text-gray-900 ${pathname.includes('/contact') ? 'font-semibold' : ''}`}>
              {dictionary.navigation.contact}
            </Link>
          </nav>

          {/* Language Switcher */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              href={switchLanguage('en')}
              className={`px-2 py-1 rounded ${lang === 'en' ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'}`}>
              EN
            </Link>
            <Link
              href={switchLanguage('ru')}
              className={`px-2 py-1 rounded ${lang === 'ru' ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'}`}>
              RU
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href={`/${lang}`}
              className={`block px-3 py-2 rounded-md ${pathname === `/${lang}` ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'}`}
              onClick={toggleMenu}>
              {dictionary.navigation.home}
            </Link>
            <Link
              href={`/${lang}/news`}
              className={`block px-3 py-2 rounded-md ${pathname.includes('/news') ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'}`}
              onClick={toggleMenu}>
              {dictionary.navigation.news}
            </Link>
            <Link
              href={`/${lang}/about`}
              className={`block px-3 py-2 rounded-md ${pathname.includes('/about') ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'}`}
              onClick={toggleMenu}>
              {dictionary.navigation.about}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className={`block px-3 py-2 rounded-md ${pathname.includes('/contact') ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'}`}
              onClick={toggleMenu}>
              {dictionary.navigation.contact}
            </Link>

            {/* Mobile Language Switcher */}
            <div className="flex space-x-2 px-3 py-2">
              <Link
                href={switchLanguage('en')}
                className={`px-2 py-1 rounded ${lang === 'en' ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'}`}
                onClick={toggleMenu}>
                EN
              </Link>
              <Link
                href={switchLanguage('ru')}
                className={`px-2 py-1 rounded ${lang === 'ru' ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'}`}
                onClick={toggleMenu}>
                RU
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
