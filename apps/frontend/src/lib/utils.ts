import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Форматирует дату в локализованный формат
 * @param dateString Строка даты в формате YYYY-MM-DD
 * @param locale Язык форматирования (ru или en)
 * @returns Отформатированная дата
 */
export function formatDate(dateString: string, locale: 'en' | 'ru'): string {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return date.toLocaleDateString(
      locale === 'ru' ? 'ru-RU' : 'en-US',
      options
    );
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}
