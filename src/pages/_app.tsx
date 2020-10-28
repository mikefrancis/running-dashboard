import { AppPropsType } from 'next/dist/next-server/lib/utils';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from '../theme';

const WrappedApp: React.FC<AppPropsType> = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
);

export default WrappedApp;
