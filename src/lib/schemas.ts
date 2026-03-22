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

export const reviewSchema = yup.object({
  name: yup.string().required("Ім'я обов'язкове"),
  rating: yup.number().min(1).max(5).required("Рейтинг обов'язковий"),
  text: yup.string().required("Відгук обов'язковий"),
  avatar: yup.string().url('Невірний формат URL аватара'),
  date: yup.date().default(() => new Date()),
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

export const contactSchema = yup
  .object({
    name: yup.string().required("Ім'я обов'язкове"),
    email: yup
      .string()
      .email('Невірний формат email')
      .required("Email обов'язковий"),
    message: yup.string().required("Повідомлення обов'язкове"),
  })
  .required();

export const eventSchema = yup.object().shape({
  name: yup
    .string()
    .required("Ім'я та прізвище обов'язкові")
    .min(2, "Ім'я повинно містити мінімум 2 символи")
    .max(50, "Ім'я не повинно перевищувати 50 символів")
    .matches(
      /^[а-яА-ЯіІїЇєЄґҐa-zA-Z\s']+$/,
      "Ім'я може містити тільки літери, пробіли, апострофи"
    ),

  email: yup
    .string()
    .required("Email обов'язковий")
    .email('Введіть коректний email')
    .max(100, 'Email не повинен перевищувати 100 символів'),

  phone: yup
    .string()
    .required("Номер телефону обов'язковий")
    .matches(/^(\+38)?[0-9]{10}$/, 'Введіть коректний номер телефону'),
});
