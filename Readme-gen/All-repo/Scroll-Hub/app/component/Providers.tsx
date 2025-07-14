'use client';

import { SessionProvider } from 'next-auth/react';
import { ImageKitProvider } from 'imagekitio-next';

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY!;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!;

export default function Providers({ children }: { children: React.ReactNode }) {
  const authenticator = async () => {
    try {
      console.log('Checkpoint-1');
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + '/imagekitauth',
      );
      console.log(res);
      if (!res.ok) throw new Error('Failed to authenticate');
      return res.json();
    } catch (error) {
      console.error('ImageKit authentication error:', error);
      throw error;
    }
  };

  return (
    <SessionProvider refetchInterval={5 * 60}>
      <ImageKitProvider
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={authenticator}
      >
        {children}
      </ImageKitProvider>
    </SessionProvider>
  );
}
