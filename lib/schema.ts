import * as z from 'zod';

export const signupSchema = z.object({
    email: z
        .string()
        .regex(
            new RegExp(
                '^[a-zA-Z0-9._%+-]+(21|[2-9][2-9])(dse)?@(aiml|ds|mech|civil|it|comp|auto).sce.edu.in$'
            ),
            'College email only allowed and only after 2020 batch.'
        ),
    password: z.string().min(7),
});

export const loginSchema = z.object({
    email: z
        .string()
        .regex(
            new RegExp(
                '^[a-zA-Z0-9._%+-]+(21|[2-9][2-9])(dse)?@(aiml|ds|mech|civil|it|comp|auto).sce.edu.in$'
            ),
            'College email only allowed and only after 2020 batch.'
        ),
    password: z.string().min(1, 'Password is required for Login'),
});

export const resetPasswordSchema = z
    .object({
        email: z
            .string()
            .regex(
                new RegExp(
                    '^[a-zA-Z0-9._%+-]+(21|[2-9][2-9])(dse)?@(aiml|ds|mech|civil|it|comp|auto).sce.edu.in$'
                ),
                'College email only allowed and only after 2020 batch.'
            ),
        password: z.string().min(7),
        reEnterPassword: z.string(),
    })
    .refine((data) => data.password === data.reEnterPassword, {
        message: "Passwords don't match",
        path: ['reEnterPassword'],
    });
