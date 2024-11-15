'use client';
import { Session, User } from 'lucia';
import { createContext, useContext } from 'react';

interface ISessionContextProps {
    user: User | null;
    session: Session | null;
}

const SessionContext = createContext<ISessionContextProps>(
    {} as ISessionContextProps
);

export function SessionProvider({
    children,
    value,
}: {
    children: React.ReactNode;
    value: ISessionContextProps;
}) {
    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    );
}

export const useSession = () => {
    const sessionContext = useContext(SessionContext);

    if (!sessionContext)
        throw new Error('UseContext hook must be within the provider!');

    return sessionContext;
};
