import { ReviewFormData } from '@/hooks/useReviewStats';
import * as yup from 'yup';

export const contactRequestSchema = yup.object({
  name: yup.string().required("Ім'я обов'язкове"),
  email: yup
    .string()
    .email('Невірний формат email')
    .required("Email обов'язковий"),
  message: yup.string().required("Повідомлення обов'язкове"),
  status: yup.string().oneOf(['new', 'read', 'replied']).default('new'),
});

export const productSchema = yup.object({
  name: yup.string().required("Назва обов'язкова"),
  description: yup.string().required("Опис обов'язковий"),
  price: yup
    .number()
    .positive('Ціна повинна бути додатною')
    .required("Ціна обов'язкова"),
  image: yup.string().url('Невірний формат URL зображення'),
  category: yup.string().required("Категорія обов'язкова"),
  isAvailable: yup.boolean().default(true),
});

export const reviewSchema = yup.object({
  name: yup.string().required("Ім'я обов'язкове"),
  rating: yup.number().min(1).max(5).required("Рейтинг обов'язковий"),
  text: yup.string().required("Відгук обов'язковий"),
  avatar: yup.string().url('Невірний формат URL аватара'),
  date: yup.date().default(() => new Date()),
});

export const categorySchema = yup.object({
  name: yup.string().required("Назва обов'язкова"),
  slug: yup.string().required("Slug обов'язковий"),
});

export const coffeeMenuSchema = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().positive().required(),
  image: yup.string().required(),
  icon: yup.string().required(),
});

export const dessertMenuSchema = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().positive().required(),
  image: yup.string().required(),
});

export const schemaReviewForm: yup.ObjectSchema<ReviewFormData> = yup.object({
  name: yup
    .string()
    .required("Вкажіть ваше ім'я")
    .min(5, "Ім'я має містити мінімум 5 символів"),
  rating: yup
    .number()
    .min(1, 'Виберіть оцінку')
    .max(5, 'Максимальна оцінка — 5')
    .required("Оцінка обов'язкова"),
  text: yup
    .string()
    .required('Введіть ваш відгук')
    .min(10, 'Відгук має містити мінімум 10 символів'),
  photo: yup.string().optional(),
});
