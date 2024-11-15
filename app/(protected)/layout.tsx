import { validateRequest } from '@/actions/validateRequests';
import { redirect } from 'next/navigation';

export interface IBaseTemplate {
    children: React.ReactNode;
}

export default async function BaseTemplate({ children }: IBaseTemplate) {
    const { session } = await validateRequest();
    if (!session) redirect('/login');
    return <div>{children}</div>;
}
