import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import App from './App';
import theme from '../theme';

describe('App', () => {
  it('should render loading when mounted', async () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    );

    expect(getByTestId('loading'));
  });

  it('should render an error', async () => {
    const server = setupServer(
      rest.get('/api/strava', (_, res, ctx) =>
        res(
          ctx.status(500),
          ctx.json({
            message: 'Uh ohez',
          })
        )
      )
    );
    server.listen();

    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(getByTestId('error'));
    });

    server.close();
  });

  it('should render the data', async () => {
    const server = setupServer(
      rest.get('/api/strava', (_, res, ctx) =>
        res(
          ctx.json([
            {
              distance: 5000,
            },
          ])
        )
      )
    );
    server.listen();

    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(getByTestId('Breakdown'));
      expect(getByTestId('Progress'));
    });

    server.close();
  });
});
