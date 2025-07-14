import { FC } from 'react';
import { Helmet } from 'react-helmet';

type SEOProps = {
  title?: string;
  author?: string;
  keywords?: string;
  description?: string;
  ogImage?: string;
  twitterImage?: string;
  url?: string;
};

const Meta: FC<SEOProps> = ({
  author = 'Team ParshuRam',
  title = 'Tokenova | An Event Management Platform',
  keywords = 'event management, smart event booking, digital check-ins, live entry tracking, real-time feedback, event feedback system, event engagement, conference feedback, Web3 ticketing, NFT event tickets, secure ticketing, anti-scalping tickets, blockchain event management',
  description = 'Tokenova is an innovative event management platform designed for seamless event booking, digital check-ins, and real-time attendee tracking. Enhance engagement with live feedback features and ensure ticket security with NFT-based ticketing, reducing scalping and counterfeiting risks.',
}) => (
  <Helmet>
    <html lang="en" />
    <title>{title}</title>
    <meta charSet="utf-8" />
    <meta name="author" content={author} />
    <meta name="keywords" content={keywords} />
    <meta name="description" content={description} />
    <meta name="robots" content="index, follow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <meta property="og:title" content={title} />
    <meta property="og:type" content="website" />
    <meta property="og:description" content={description} />
    <meta property="og:image" content="/Logo/main-logo.png" />

    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:card" content="summary_large_image" />

    <link rel="icon" href="/Logo/main-logo.png" type="image/webp" />
  </Helmet>
);

export default Meta;
