// pages/whitepaper.tsx

import { GetServerSideProps } from 'next';
import WhitepaperViewer from '../components/WhitepaperViewer';
import { generateMetadata } from '../utils/metadataUtils';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const isJson = context.req.url?.endsWith('.json') || false;

  if (isJson) {
    const metadata = generateMetadata('default');
    context.res.setHeader('Content-Type', 'application/json');
    context.res.write(JSON.stringify(metadata));
    context.res.end();
    return { props: {} };
  }

  return { props: { isJson } };
};

export default function Whitepaper() {
  return <WhitepaperViewer />;
}
