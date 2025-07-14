import NotFound from '@/components/NotFoundPage';
import { Metadata } from 'next';
import React from 'react';

const page = () => {
  return <NotFound />;
};

export const metadata: Metadata = {
  title: 'Page Not Found',
};

export default page;
