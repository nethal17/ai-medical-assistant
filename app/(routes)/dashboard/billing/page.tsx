import { PricingTable } from '@clerk/nextjs';
import React from 'react';

const BillingPage = () => {
  return (
    <div className='px-10 md:px-24 lg:px-42 '>
        <h2 className='font-bold text-3xl mb-15 text-green-700 mt-10'>Join Subscription</h2>
        <PricingTable />
    </div>
  )
};

export default BillingPage;