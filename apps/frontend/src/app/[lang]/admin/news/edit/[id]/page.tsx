import { NewsForm } from '../../news-form';
import { eden } from '@/features/eden/eden';
import { AuthProvider } from '@/components/admin/auth-provider';

export default async function EditNewsPage({
  params,
}: {
  params: { slug: string };
}) {
  const news = await eden.news({ slug: params.slug }).get();

  if (!news.data) {
    return (
      <AuthProvider>
        <div className="container py-10">
          <h1 className="text-3xl font-bold tracking-tight mb-6">
            Новость не найдена
          </h1>
          <p>Запрашиваемая новость не найдена.</p>
        </div>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <div className="container py-10">
        <h1 className="text-3xl font-bold tracking-tight mb-6">
          Редактирование новости
        </h1>
        <NewsForm news={news.data[0]} />
      </div>
    </AuthProvider>
  );
}
