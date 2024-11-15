import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import type { Session, User } from 'lucia';
import { Lucia } from 'lucia';

import type { IUser } from './db';
import db from './db';

const adapter = new PrismaAdapter(db.session, db.user);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        // this sets cookies with super long expiration
        // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
        expires: false,
        attributes: {
            // set to `true` when using HTTPS
            secure: process.env.NODE_ENV === 'production',
        },
    },
    getUserAttributes: (attributes) => {
        return {
            username: attributes.username,
            email: attributes.email,
        };
    },
});

// IMPORTANT!
declare module 'lucia' {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: IUser;
    }
}

export interface ActionResult {
    error?: string | undefined;
    success?: string | undefined;
}
