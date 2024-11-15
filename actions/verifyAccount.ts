'use server';

import db from '@/lib/db';
import jwt from 'jsonwebtoken';
import { verificationMail } from './email';

export async function verifyAccount({
    userId,
    email,
}: {
    email: string;
    userId: string;
}) {
    // const resend = new Resend(process.env.RESEND_API_KEY);

    const code = Math.random().toString(36).substring(2, 8);
    const token = jwt.sign({ email, userId, code }, process.env.JWT_SECRET!, {
        expiresIn: '5m',
    });

    const existingToken = await db.emailVerification.findFirst({
        where: {
            userId,
        },
    });

    if (existingToken) {
        const sentAt = new Date(existingToken.createdAt);
        const hasOneMinutePassed =
            new Date().getTime() - sentAt.getTime() > 60000;

        if (!hasOneMinutePassed) {
            return {
                error: 'Email already sent , wait for countdown',
            };
        }

        await db.emailVerification.update({
            where: {
                id: existingToken.id,
            },
            data: {
                code,
                createdAt: new Date(),
            },
        });
    } else {
        await db.emailVerification.create({
            data: {
                code: code,
                user: { connect: { id: userId } },
            },
        });
    }

    const url = `${process.env.NEXT_BASE_URL}/api/verify-email?token=${token}`;

    console.log(url);

    try {
        await verificationMail(url, email);
        return;
    } catch (error) {
        const resp = { error };
        return resp;
    }

    // send mail
}
