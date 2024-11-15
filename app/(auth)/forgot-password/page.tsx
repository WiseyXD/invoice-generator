import { decodeJWT } from '@/actions/resetPassword';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import { redirect } from 'next/navigation';
import React from 'react';

export type TServerSideProps = {
    params: {};
    searchParams: {
        [token: string]: string | undefined;
    };
};

async function Page(props: TServerSideProps): Promise<React.ReactNode> {
    const { token } = props.searchParams;
    if (!token) redirect('/');
    const resp = await decodeJWT(token);

    if (resp.error) {
        return redirect('/');
    }

    return (
        <>
            {/* @ts-expect-error Server Component */}
            <ForgotPasswordForm email={resp.email} />
        </>
    );
}

export default Page;
