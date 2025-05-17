import Image from 'next/image';
import Link from 'next/link';
import { getDictionary } from './dictionaries';
import { eden } from '@/features/eden/eden';

export default async function Home({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang as 'en' | 'ru');
  const news = (await eden.news.get()).data?.slice(0, 2);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              {dict.home.title}
            </h1>
            <p className="text-xl text-gray-700">{dict.home.subtitle}</p>
            <Link
              href={`/${params.lang}/about`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
              {dict.home.cta}
            </Link>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <Image
              src="/images/medical-research-lab.png"
              width={500}
              height={400}
              alt="Cancer Research"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Featured Research */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {params.lang === 'en'
              ? 'Our Research Areas'
              : 'Направления исследований'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <Image
                  src="/images/molecular-biology-research.png"
                  width={400}
                  height={200}
                  alt="Molecular Research"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {params.lang === 'en'
                  ? 'Molecular Oncology'
                  : 'Молекулярная онкология'}
              </h3>
              <p className="text-gray-600">
                {params.lang === 'en'
                  ? 'Studying the molecular mechanisms of cancer development and progression.'
                  : 'Изучение молекулярных механизмов развития и прогрессирования рака.'}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <Image
                  src="/images/placeholder.svg?key=23sbq"
                  width={400}
                  height={200}
                  alt="Immunotherapy Research"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {params.lang === 'en' ? 'Immunotherapy' : 'Иммунотерапия'}
              </h3>
              <p className="text-gray-600">
                {params.lang === 'en'
                  ? 'Developing novel approaches to harness the immune system to fight cancer.'
                  : 'Разработка новых подходов к использованию иммунной системы для борьбы с раком.'}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <Image
                  src="/images/precision-oncology.png"
                  width={400}
                  height={200}
                  alt="Precision Medicine"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {params.lang === 'en'
                  ? 'Precision Medicine'
                  : 'Персонализированная медицина'}
              </h3>
              <p className="text-gray-600">
                {params.lang === 'en'
                  ? 'Tailoring cancer treatments to individual patients based on genetic profiles.'
                  : 'Адаптация методов лечения рака для отдельных пациентов на основе генетических профилей.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Preview */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">{dict.news.title}</h2>
            <Link
              href={`/${params.lang}/news`}
              className="text-blue-600 hover:text-blue-800 font-medium">
              {params.lang === 'en' ? 'View All News' : 'Все новости'}
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {news?.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(item.date).toLocaleDateString(
                    params.lang as 'en' | 'ru',
                    { year: 'numeric', month: 'long', day: 'numeric' }
                  )}
                </p>
                <h3 className="text-xl font-semibold mb-3">
                  {item.title[params.lang as 'en' | 'ru']}
                </h3>
                <p className="text-gray-600 mb-4">
                  {item.description[params.lang as 'en' | 'ru']}
                </p>
                <Link
                  href={`/${params.lang}/news/${item.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium">
                  {dict.news.readMore}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
