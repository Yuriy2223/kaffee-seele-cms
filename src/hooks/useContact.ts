import { useMutation } from '@tanstack/react-query';

interface ContactData {
  name: string;
  email: string;
  message: string;
}

export const useContactMutation = () => {
  return useMutation({
    mutationFn: async (data: ContactData) => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Помилка відправки повідомлення');
      return response.json();
    },
  });
};
