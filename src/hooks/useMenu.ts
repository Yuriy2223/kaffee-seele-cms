import { useQuery } from '@tanstack/react-query';
import {
  ICoffeeOrigin,
  ICoffeeMenu,
  IDessertMenu,
  IBaristaRecommend,
  ICoffeeQuiz,
  ITeamMember,
  IHero,
  IAbout,
  IGalleryItem,
  IContacts,
} from '@/shared/types';

export const useTeamMembers = () => {
  return useQuery<ITeamMember[]>({
    queryKey: ['team-members'],
    queryFn: async () => {
      const response = await fetch('/api/team-members');
      if (!response.ok)
        throw new Error('Помилка завантаження даних про команду');
      const result = await response.json();
      return result.data ?? result;
    },
  });
};

export const useCoffeeMenu = () => {
  return useQuery<ICoffeeMenu[]>({
    queryKey: ['menu', 'coffee'],
    queryFn: async () => {
      const response = await fetch('/api/menu/coffee');
      if (!response.ok) throw new Error('Помилка завантаження кавового меню');
      const result = await response.json();
      return result.data ?? result;
    },
  });
};

export const useDessertsMenu = () => {
  return useQuery<IDessertMenu[]>({
    queryKey: ['menu', 'desserts'],
    queryFn: async () => {
      const response = await fetch('/api/menu/desserts');
      if (!response.ok) throw new Error('Помилка завантаження десертів');
      const result = await response.json();
      return result.data ?? result;
    },
  });
};

export const useBaristaRecommendation = () => {
  return useQuery<IBaristaRecommend | null>({
    queryKey: ['barista-recommend'],
    queryFn: async () => {
      const response = await fetch('/api/barista-recommend');
      if (!response.ok)
        throw new Error('Помилка завантаження рекомендації бариста');
      const result = await response.json();

      return result.latestItem || null;
    },
  });
};

export const useCoffeeQuiz = () => {
  return useQuery<ICoffeeQuiz[]>({
    queryKey: ['quizzes'],
    queryFn: async () => {
      const response = await fetch('/api/quizzes');
      if (!response.ok) throw new Error('Помилка завантаження квізу');
      const result = await response.json();
      return result.data ?? result;
    },
  });
};

export const useCoffeeOrigins = () => {
  return useQuery<ICoffeeOrigin[]>({
    queryKey: ['origins'],
    queryFn: async () => {
      const response = await fetch('/api/origins');
      if (!response.ok)
        throw new Error('Помилка завантаження даних про походження');
      const result = await response.json();
      return result.data ?? result;
    },
  });
};

export const useHero = (initialData?: IHero) => {
  return useQuery<IHero>({
    queryKey: ['hero'],
    initialData,
    queryFn: async () => {
      const response = await fetch('/api/hero');
      if (!response.ok)
        throw new Error('Контент Hero не знайдено в базі даних');
      const result = await response.json();
      return result.data ?? result;
    },
  });
};

export const useAbout = () => {
  return useQuery<IAbout>({
    queryKey: ['about'],
    queryFn: async () => {
      const response = await fetch('/api/about');
      if (!response.ok)
        throw new Error("Помилка завантаження даних про кав'ярню");
      const result = await response.json();
      return result.data ?? result;
    },
  });
};

export const useGallery = () => {
  return useQuery<IGalleryItem[]>({
    queryKey: ['gallery'],
    queryFn: async () => {
      const response = await fetch('/api/gallery');
      if (!response.ok) throw new Error('Помилка завантаження галереї');
      const result = await response.json();
      return result.data ?? result;
    },
  });
};

export const useContacts = () => {
  return useQuery<IContacts>({
    queryKey: ['contacts'],
    queryFn: async () => {
      const response = await fetch('/api/contacts');
      if (!response.ok) throw new Error('Помилка завантаження контактів');
      const result = await response.json();
      return result.data ?? result;
    },
  });
};
