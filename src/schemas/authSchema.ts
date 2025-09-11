
import { z } from 'zod';
//login data sent to the api
export const loginSchema = z.object({
  username: z.email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
});

//register sent to the api 
export const registerSchema = z.object({
  first_name: z.string().min(1, 'First name is required').min(2, 'First name must be at least 2 characters'),
  last_name: z.string().min(1, 'Last name is required').min(2, 'Last name must be at least 2 characters'),
  email: z.email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters').regex(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter').regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter').regex(/(?=.*\d)/, 'Password must contain at least one number'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});