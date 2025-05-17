import 'server-only';

interface Dictionary {
  metadata: {
    title: string;
    description: string;
  };
  navigation: {
    home: string;
    news: string;
    about: string;
    contact: string;
  };
  home: {
    title: string;
    subtitle: string;
    cta: string;
  };
  news: {
    title: string;
    readMore: string;
    noNews: string;
  };
  about: {
    title: string;
    mission: {
      title: string;
      description: string;
    };
    research: {
      title: string;
      description: string;
    };
    team: {
      title: string;
      description: string;
    };
  };
  contact: {
    title: string;
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
    };
    address: string;
    phone: string;
    email: string;
  };
}

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  ru: () => import('./dictionaries/ru.json').then((module) => module.default),
};

export const getDictionary = async (locale: 'en' | 'ru') => {
  return dictionaries[locale]();
};
