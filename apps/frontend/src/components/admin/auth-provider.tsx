'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAuth = localStorage.getItem('admin_authorized') === 'true';
    setIsAuthorized(isAuth);
    setIsLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === 'diplom2025') {
      localStorage.setItem('admin_authorized', 'true');
      setIsAuthorized(true);
      setError('');
    } else {
      setError('Неверный пароль');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_authorized');
    setIsAuthorized(false);
  };

  // Показываем заглушку во время проверки авторизации
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Загрузка...
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Авторизация администратора
            </h2>
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Введите пароль"
                  />
                  {error && <p className="text-destructive text-sm">{error}</p>}
                </div>
                <Button type="submit" className="w-full">
                  Войти
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end p-4">
        <Button variant="outline" onClick={handleLogout}>
          Выйти
        </Button>
      </div>
      {children}
    </div>
  );
}
