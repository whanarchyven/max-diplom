import { eden } from '@/features/eden/eden';
import { getDictionary } from '../dictionaries';
import Link from 'next/link';

export default async function NewsPage({
  params,
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(params.lang as 'en' | 'ru');

  const news = await eden.news.get();
  console.log(news.data, 'NEWS');

  // Mock news data - in a real application, this would come from a database or API

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{dict.news.title}</h1>

      {news.data.length > 0 ? (
        <div className="space-y-8">
          {news.data.map((item) => (
            <article
              key={item.slug}
              className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-sm text-gray-500 mb-2">
                {new Date(item.date).toLocaleDateString(
                  params.lang as 'en' | 'ru',
                  { year: 'numeric', month: 'long', day: 'numeric' }
                )}
              </p>
              <h2 className="text-xl font-semibold mb-3">
                {item.title[params.lang as 'en' | 'ru']}
              </h2>
              <p className="text-gray-600 mb-4">
                {item.description[params.lang as 'en' | 'ru']}
              </p>
              <Link
                href={`/${params.lang}/news/${item.slug}`}
                className="text-blue-600 hover:text-blue-800 font-medium">
                {dict.news.readMore}
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">{dict.news.noNews}</p>
      )}
    </div>
  );
}
