'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { News } from './news-form';

// Mock data - replace with actual data fetching

export function NewsTable({ initialNews }: { initialNews: News[] }) {
  const [news, setNews] = useState(initialNews);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      // In a real app, this would call a server action to delete the news
      //await deleteNews(id)
      setNews(news.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении новости:', error);
    } finally {
      setIsDeleting(false);
      setCurrentId(null);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Заголовок (RU)</TableHead>
            <TableHead>Заголовок (EN)</TableHead>
            <TableHead>Дата</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead className="w-[100px]">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {news.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                Новости не найдены.
              </TableCell>
            </TableRow>
          ) : (
            news.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.title.ru}</TableCell>
                <TableCell>{item.title.en}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.slug}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link href={`/admin/news/edit/${item.slug}`}>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-destructive"
                          onClick={() => setCurrentId(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Это действие нельзя отменить. Новость будет удалена
                            навсегда.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Отмена</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(item.id)}
                            disabled={isDeleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            {isDeleting && currentId === item.id
                              ? 'Удаление...'
                              : 'Удалить'}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
