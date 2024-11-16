import { validateRequest } from '@/actions/validateRequests';
import React from 'react';

export default async function page() {
    const { session, user } = await validateRequest();
    console.log(user);
    return <div>Invoice</div>;
}
