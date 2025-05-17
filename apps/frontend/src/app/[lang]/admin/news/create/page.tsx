import { NewsForm } from '../news-form';
import { AuthProvider } from '@/components/admin/auth-provider';

export default function CreateNewsPage() {
  return (
    <AuthProvider>
      <div className="container py-10">
        <h1 className="text-3xl font-bold tracking-tight mb-6">
          Создание новости
        </h1>
        <NewsForm />
      </div>
    </AuthProvider>
  );
}
