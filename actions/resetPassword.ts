'use server';

import db from '@/lib/db';
import jwt from 'jsonwebtoken';
import { Argon2id } from 'oslo/password';
import { sendResetPasswordEmail } from './email';

export async function sendLinkInMail(email: string) {
    const baseUrl = process.env.NEXT_BASE_URL!;
    const userExists = await db.user.findUnique({
        where: { email },
    });

    if (!userExists) {
        return {
            error: 'No user exists with thie email in DB.',
        };
    }
    const code = Math.random().toString(36).substring(2, 8);
    const token = jwt.sign({ email, code }, process.env.JWT_SECRET!, {
        expiresIn: '5m',
    });
    const link = `${baseUrl}/forgot-password?token=${token}`;
    console.log(link);

    try {
        await sendResetPasswordEmail(email, link);
        return {
            success: 'Email sent',
        };
    } catch (error: any) {
        return {
            error: error.message,
        };
    }
}

export async function decodeJWT(token: string | undefined) {
    if (!token)
        return {
            error: 'No token provided',
        };

    try {
        const { email, code } = jwt.verify(token, process.env.JWT_SECRET!) as {
            email: string;
            code: string;
        };
        if (!email) return { error: 'No Email Found' };
        return { email };
    } catch (error: any) {
        return { error: error?.message };
    }
}

export async function resetPassword(email: string, password: string) {
    const userExists = await db.user.findUnique({
        where: { email },
    });

    if (!userExists) {
        return {
            error: 'No user exists with thie email in DB.',
        };
    }

    const validPassowrd = await new Argon2id().verify(
        userExists.password,
        password
    );

    if (validPassowrd) {
        return {
            error: 'Please enter a new password.',
        };
    }

    const hashedPassword = await new Argon2id().hash(password);

    const newPassowrdSet = await db.user.update({
        where: {
            email,
        },
        data: {
            password: hashedPassword,
        },
    });

    return {
        success: 'Password successfully changed.',
    };
}
