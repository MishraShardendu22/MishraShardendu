import { Helmet } from 'react-helmet';

interface MetaDataProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const DEFAULT_META = {
  title: 'Donate Blood Save Life | Our Blood Bank',
  description:
    'Welcome to Our Blood Bank, a website that manages and provides information about blood donors, hospitals, etc. Donate blood, save life.',
  keywords: 'react, node, express, mongodb, our blood bank',
};

const MetaData = ({
  title = DEFAULT_META.title,
  description = DEFAULT_META.description,
  keywords = DEFAULT_META.keywords,
}: MetaDataProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta charSet="UTF-8" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:description" content={description} />
    </Helmet>
  );
};

export default MetaData;
