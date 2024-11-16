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

const InvoiceItemSchema = z.object({
    description: z
        .string()
        .min(1, 'Item description is required')
        .max(255, "Description can't exceed 255 characters"),
    quantity: z
        .number()
        .min(1, 'Quantity must be at least 1')
        .int('Quantity must be an integer'),
    price: z
        .number()
        .min(0, 'Price must be non-negative')
        .finite('Price must be a valid number'),
});

const InvoiceSchema = z.object({
    clientName: z.string().min(1, 'Client name is required').max(100),
    clientEmail: z
        .string()
        .email('Invalid email address')
        .max(100, "Email can't exceed 100 characters"),
    dueDate: z.string().refine(
        (date) => !isNaN(Date.parse(date)), // Ensure it's a valid date
        'Due date must be a valid date'
    ),
    items: z
        .array(InvoiceItemSchema)
        .nonempty('Invoice must have at least one item'),
});

export default InvoiceSchema;
