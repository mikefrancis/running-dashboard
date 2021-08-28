import { AppPropsType } from 'next/dist/shared/lib/utils';
import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

import theme from '../theme';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }
`;

const StyledApp = styled.div`
  background-color: #1c3d5a;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;

  @media (min-width: ${(props) => props.theme.width.sm}) {
    align-items: center;
    display: flex;
  }
`;

const WrappedApp: React.FC<AppPropsType> = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <StyledApp>
      <GlobalStyle />
      <Component {...pageProps} />
    </StyledApp>
  </ThemeProvider>
);

export default WrappedApp;
