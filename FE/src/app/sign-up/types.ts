import { z } from 'zod';

export const signUpFormSchema = z
  .object({
    email: z.string().min(4, 'Email is required').email('Please enter a valid email'),
    first_name: z.string().min(1, 'Name is required').min(3, 'Too short'),
    last_name: z.string().min(1, 'Name is required').min(3, 'Too short'),
    password: z.string().min(1, 'Password is required').min(7, 'Too short'),
    confirm_password: z.string().min(1, 'Confirm Password is required').min(7, 'Too short'),
  })
  .superRefine(({ confirm_password, password }, ctx) => {
    if (confirm_password !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirm_password'],
      });
    }
  });

export type signUpFormType = z.infer<typeof signUpFormSchema>;
