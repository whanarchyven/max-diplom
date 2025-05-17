'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ImageIcon, Loader2, Upload, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { eden } from '@/features/eden/eden';

export type News = {
  id: string;
  slug: string;
  date?: string;
  title: {
    en: string;
    ru: string;
  };
  description: {
    en: string;
    ru: string;
  };
  content: {
    en: string;
    ru: string;
  };
  image: string;
};

interface NewsFormProps {
  news?: News;
}

export function NewsForm({ news }: NewsFormProps = {}) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    news?.image || null
  );
  const [imageUrl, setImageUrl] = useState<string>(news?.image || '');
  const [uploadProgress, setUploadProgress] = useState(0);

  // Состояние для полей формы
  const [formData, setFormData] = useState({
    slug: news?.slug || '',
    date: news?.date || new Date().toISOString().split('T')[0],
    title: {
      en: news?.title?.en || '',
      ru: news?.title?.ru || '',
    },
    description: {
      en: news?.description?.en || '',
      ru: news?.description?.ru || '',
    },
    content: {
      en: news?.content?.en || '',
      ru: news?.content?.ru || '',
    },
  });

  const isEditing = !!news;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let result;
      if (isEditing && news) {
        //result = await updateNews(news.id, formData)
      } else {
        result = await eden.news.post({
          slug: formData.slug,
          date: formData.date,
          title: {
            en: formData.title.en,
            ru: formData.title.ru,
          },
          description: {
            en: formData.description.en,
            ru: formData.description.ru,
          },
          content: {
            en: formData.content.en,
            ru: formData.content.ru,
          },
          image: imageUrl,
        });
        //result = await createNews(formData)
      }

      console.log(result, 'RESULT');

      //   if (result.success) {
      //     toast({
      //       title: isEditing ? "Новость обновлена" : "Новость создана",
      //       description: isEditing ? "Новость успешно обновлена." : "Новость успешно создана.",
      //     })
      //     router.push("/admin/news")
      //   } else {
      //     toast({
      //       title: "Ошибка",
      //       description: result.message || "Произошла ошибка",
      //       variant: "destructive",
      //     })
      //   }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Произошла непредвиденная ошибка',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Create a local preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + 10;
          if (newProgress >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return newProgress;
        });
      }, 200);

      // In a real app, upload the file to a server
      const formData = new FormData();
      formData.append('file', file);

      //   const result = await uploadImage(formData)

      //   if (result.success && result.url) {
      //     setImageUrl(result.url)
      //     toast({
      //       title: "Изображение загружено",
      //       description: "Изображение успешно загружено.",
      //     })
      //   } else {
      //     toast({
      //       title: "Ошибка",
      //       description: result.message || "Не удалось загрузить изображение",
      //       variant: "destructive",
      //     })
      //   }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Произошла ошибка при загрузке изображения',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageUrl('');
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageUrl(url);
    if (url) {
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  // Обработчик изменения полей формы
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
    lang?: 'en' | 'ru'
  ) => {
    const { value } = e.target;

    if (lang) {
      // Для мультиязычных полей (title, description, content)
      setFormData((prev) => {
        const updatedField = field as 'title' | 'description' | 'content';
        return {
          ...prev,
          [updatedField]: {
            ...prev[updatedField],
            [lang]: value,
          },
        };
      });
    } else {
      // Для обычных полей (slug, date)
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="slug">
                    Slug <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="slug"
                    name="slug"
                    placeholder="news-article-slug"
                    value={formData.slug}
                    required
                    onChange={(e) => handleFormChange(e, 'slug')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Дата</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleFormChange(e, 'date')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">
                    Изображение <span className="text-destructive">*</span>
                  </Label>
                  <div className="flex flex-col gap-4">
                    <div className="border rounded-md p-2 aspect-video flex items-center justify-center bg-muted/40 overflow-hidden relative">
                      {imagePreview ? (
                        <>
                          <img
                            src={imagePreview || '/placeholder.svg'}
                            alt="Предпросмотр новости"
                            className="max-h-full object-contain"
                          />
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 bg-destructive text-white p-1 rounded-full hover:bg-destructive/90">
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        <div className="flex flex-col items-center text-muted-foreground">
                          <ImageIcon className="h-10 w-10 mb-2" />
                          <span>Изображение не выбрано</span>
                        </div>
                      )}

                      {isUploading && (
                        <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center">
                          <div className="w-full max-w-xs bg-secondary rounded-full h-2 mb-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Загрузка: {uploadProgress}%
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <Input
                          id="image"
                          name="image-file"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={isUploading}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={() =>
                            document.getElementById('image')?.click()
                          }
                          disabled={isUploading}>
                          {isUploading ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Загрузка...
                            </>
                          ) : (
                            <>
                              <Upload className="h-4 w-4 mr-2" />
                              Загрузить
                            </>
                          )}
                        </Button>
                      </div>

                      <Input
                        id="image-url"
                        name="image-url"
                        placeholder="URL изображения"
                        value={imageUrl}
                        onChange={handleImageUrlChange}
                        disabled={isUploading}
                      />
                    </div>

                    <input type="hidden" name="image" value={imageUrl} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="ru" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="ru">Русский</TabsTrigger>
              <TabsTrigger value="en">English</TabsTrigger>
            </TabsList>

            <TabsContent value="ru" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title-ru">
                        Заголовок (RU){' '}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="title-ru"
                        name="title.ru"
                        placeholder="Заголовок новости на русском"
                        value={formData.title.ru}
                        required
                        onChange={(e) => handleFormChange(e, 'title', 'ru')}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description-ru">
                        Описание (RU){' '}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="description-ru"
                        name="description.ru"
                        placeholder="Описание новости на русском"
                        rows={3}
                        value={formData.description.ru}
                        required
                        onChange={(e) =>
                          handleFormChange(e, 'description', 'ru')
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content-ru">
                        Содержание (RU){' '}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="content-ru"
                        name="content.ru"
                        placeholder="Полное содержание новости на русском"
                        rows={10}
                        value={formData.content.ru}
                        required
                        onChange={(e) => handleFormChange(e, 'content', 'ru')}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="en" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title-en">
                        Заголовок (EN){' '}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="title-en"
                        name="title.en"
                        placeholder="News Title in English"
                        value={formData.title.en}
                        required
                        onChange={(e) => handleFormChange(e, 'title', 'en')}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description-en">
                        Описание (EN){' '}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="description-en"
                        name="description.en"
                        placeholder="News description in English"
                        rows={3}
                        value={formData.description.en}
                        required
                        onChange={(e) =>
                          handleFormChange(e, 'description', 'en')
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content-en">
                        Содержание (EN){' '}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="content-en"
                        name="content.en"
                        placeholder="Full news content in English"
                        rows={10}
                        value={formData.content.en}
                        required
                        onChange={(e) => handleFormChange(e, 'content', 'en')}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/news')}
            disabled={isSubmitting}>
            Отмена
          </Button>
          <Button type="submit" disabled={isSubmitting || isUploading}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting
              ? isEditing
                ? 'Обновление...'
                : 'Создание...'
              : isEditing
                ? 'Обновить новость'
                : 'Создать новость'}
          </Button>
        </div>
      </div>
    </form>
  );
}
