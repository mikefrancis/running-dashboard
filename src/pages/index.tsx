import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(() => import('../components/App'), {
  ssr: false,
});

export default DynamicComponentWithNoSSR;
