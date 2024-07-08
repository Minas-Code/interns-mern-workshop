import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required').min(7, 'Too short'),
});

export type loginFormType = z.infer<typeof loginFormSchema>;
