import { TypeOf, object, string } from 'zod';

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required',
        }).min(2, 'Name must be at least 2 characters'),
        email: string({
            required_error: 'Email is required',
            }).email('Invalid email'),
        password: string({
            required_error: 'Password is required',
            }).min(8, 'Password must be at least 8 characters'),
        passwordConfirmation: string({
            required_error: 'Confirm password is required',
            }).min(8, 'Confirm password must be at least 8 characters'),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    }),
});

export type CreatueUserInput = Omit<TypeOf<typeof createUserSchema>, "body.passwordConfirmation">;