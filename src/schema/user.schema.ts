import { TypeOf, object, z } from 'zod';
export const createUserSchema = z.object({
  body: z
    .object({
      name: z.string({
        required_error: 'Name is required',
      }),
      password: z
        .string({
          required_error: 'password is required ',
        })
        .min(6, 'password should be atleat 6 characters long')
        .max(64),
      passwordConfirmation: z
        .string({
          required_error: 'password is required ',
        })
        .min(6, 'password should be atleat 6 characters long')
        .max(64),
      email: z
        .string({
          required_error: 'email is required',
        })
        .email('Not a valid email, please provide a valid email !'),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: 'Passwords do not match',
      path: ['passwordConfirmation'],
    }), // note: see Schema.Note.md
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
