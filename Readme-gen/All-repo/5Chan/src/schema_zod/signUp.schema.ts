import { z } from 'zod';

export const usernameValidation = z
  .string()
  .min(3, 'Username must be at least 3 characters')
  .max(255, 'Username must be at most 255 characters')
  .regex(/^[a-zA-Z0-9_]*$/, 'Username must contain only letters, numbers, and underscores');

export const emailValidation = z
  .string()
  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address');

export const passwordValidation = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be at most 128 characters');

export const signUpSchema = z.object({
  username: usernameValidation,
  email: emailValidation,
  password: passwordValidation,
});
