import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { NewsTable } from './news-table';
import { eden } from '@/features/eden/eden';
import { AuthProvider } from '@/components/admin/auth-provider';

export default async function NewsPage() {
  const news = (await eden.news.get()).data;
  return (
    <AuthProvider>
      <div className="container py-10 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Управление новостями
          </h1>
          <Link href="/admin/news/create">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Создать новость
            </Button>
          </Link>
        </div>
        <NewsTable initialNews={news} />
      </div>
    </AuthProvider>
  );
}
