'use server';

import { ActionResult, lucia } from '@/lib/auth';
import db from '@/lib/db';
import { loginSchema } from '@/lib/schema';
import { cookies } from 'next/headers';
import { Argon2id } from 'oslo/password';

export async function login(values: {
    email: string;
    password: string;
}): Promise<ActionResult> {
    const validInputs = loginSchema.safeParse(values);
    if (!validInputs.success) {
        return {
            error: 'Invlaid Inputs',
        };
    }
    const { email, password } = validInputs.data;

    try {
        const existingUser = await db.user.findUnique({
            where: {
                email,
            },
        });
        if (!existingUser) {
            // NOTE:
            // Returning immediately allows malicious actors to figure out valid usernames from response times,
            // allowing them to only focus on guessing passwords in brute-force attacks.
            // As a preventive measure, you may want to hash passwords even for invalid usernames.
            // However, valid usernames can be already be revealed with the signup page among other methods.
            // It will also be much more resource intensive.
            // Since protecting against this is non-trivial,
            // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
            // If usernames are public, you may outright tell the user that the username is invalid.
            return {
                error: 'No user exists with this email in DB',
            };
        }

        const validPassword = await new Argon2id().verify(
            existingUser.password,
            password
        );
        if (!validPassword) {
            return {
                error: 'Incorrect password',
            };
        }

        if (!existingUser.isEmailVerified) {
            return {
                error: 'Please verify your email',
            };
        }

        // await verifyAccount({ email: existingUser.email, userId: existingUser.id });

        const session = await lucia.createSession(existingUser.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );

        const baseUrl = new URL(process.env.NEXT_BASE_URL!);

        return {
            success: 'Logging in',
        };
    } catch (error: any) {
        return { error: error.message };
    }
}
