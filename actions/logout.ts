'use server';

import { ActionResult, lucia } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { validateRequest } from './validateRequests';

export async function logout(): Promise<ActionResult> {
    try {
        const { session } = await validateRequest();
        if (!session) {
            return {
                error: 'Unauthorized',
            };
        }

        await lucia.invalidateSession(session.id);

        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );
        return redirect('/login');
    } catch (error: any) {
        return {
            error: error.message,
        };
    }
}
