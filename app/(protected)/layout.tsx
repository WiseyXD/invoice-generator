import { validateRequest } from '@/actions/validateRequests';
import { redirect } from 'next/navigation';

export interface IBaseTemplate {
    children: React.ReactNode;
}

export default async function BaseTemplate({ children }: IBaseTemplate) {
    const { session } = await validateRequest();
    if (!session) redirect('/login');
    return (
        <div>
            {' '}
            <main className="min-h-[93vh] flex flex-col items-center justify-center p-24 gap-y-10 ">
                {children}
            </main>
        </div>
    );
}
