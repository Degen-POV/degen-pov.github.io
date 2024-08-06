// pages/whitepaper/[id].tsx

import { GetServerSideProps } from 'next';
import WhitepaperViewer from '../../components/WhitepaperViewer';
import { generateMetadata } from '../../utils/metadataUtils';

interface WhitepaperProps {
  id: string;
  isJson: boolean;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const isJson = context.req.url?.endsWith('.json') || false;

  if (isJson) {
    const metadata = generateMetadata(id);
    context.res.setHeader('Content-Type', 'application/json');
    context.res.write(JSON.stringify(metadata));
    context.res.end();
    return { props: {} };
  }

  return { props: { id, isJson } };
};

export default function Whitepaper({ id, isJson }: WhitepaperProps) {
  if (isJson) {
    return null;
  }

  return <WhitepaperViewer id={id} />;
}
