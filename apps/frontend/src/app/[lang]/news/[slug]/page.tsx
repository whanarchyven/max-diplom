import { eden } from '@/features/eden/eden';
import { getDictionary } from '../../dictionaries';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

export default async function NewsPage({
  params,
}: {
  params: { slug: string; lang: string };
}) {
  const news = await eden.news({ slug: params.slug }).get();
  const dict = await getDictionary(params.lang as 'en' | 'ru');

  if (!news.data || news.data.length === 0) {
    notFound();
  }

  const currentLang = params.lang as 'en' | 'ru';
  const newsItem = news.data;

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4 sm:px-6">
      <div className="mb-8">
        <Link href={`/${currentLang}/news`}>
          <Button variant="ghost" className="pl-0 hover:bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {currentLang === 'ru' ? 'Назад к новостям' : 'Back to news'}
          </Button>
        </Link>
      </div>

      <article className="prose prose-lg max-w-none">
        <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
          {newsItem.image && (
            <img
              src={newsItem.image}
              alt={newsItem.title[currentLang]}
              className="object-cover"
            />
          )}
        </div>

        <header className="mb-10">
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <Calendar className="mr-1 h-4 w-4" />
            <time dateTime={newsItem.date}>
              {formatDate(newsItem.date, currentLang)}
            </time>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            {newsItem.title[currentLang]}
          </h1>
          <p className="text-xl text-muted-foreground">
            {newsItem.description[currentLang]}
          </p>
        </header>

        <div className="prose prose-lg prose-stone dark:prose-invert">
          {newsItem.content[currentLang]
            .split('\n')
            .map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
        </div>
      </article>
    </div>
  );
}
