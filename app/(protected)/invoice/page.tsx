import { validateRequest } from '@/actions/validateRequests';
import InvoiceForm from '@/components/InvoiceForm';
import React from 'react';

export default async function page() {
    const { session, user } = await validateRequest();
    console.log(user);
    return <InvoiceForm />;
}
