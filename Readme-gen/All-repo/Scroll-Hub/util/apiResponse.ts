import { NextResponse } from 'next/server';

// Function to send a response
export const sendResponse = (status: number, message = '', data = {}) => {
  return NextResponse.json(
    {
      message,
      data,
    },
    {
      status,
    },
  );
};
