import React from 'react';
import axiosMock from 'axios';
import { render, cleanup, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import App from './App';
import theme from '../theme';

jest.mock('axios');

describe('DataFetcher', () => {
  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  it('should render loading when mounted', async () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    );

    expect(getByTestId('loading'));
  });

  it('should render an error', async () => {
    axiosMock.get = jest.fn(() =>
      Promise.reject({
        message: 'oh noes',
      })
    );

    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(axiosMock.get).toHaveBeenCalledTimes(1);
      expect(getByTestId('error'));
    });
  });

  it('should render the data', async () => {
    axiosMock.get = jest.fn(
      () =>
        Promise.resolve({
          data: [
            {
              start_date: '2019-01-01 00:00:00',
              distance: 10000,
            },
          ],
        }) as any
    );

    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(axiosMock.get).toHaveBeenCalledTimes(1);
      expect(getByTestId('Breakdown'));
      expect(getByTestId('Progress'));
    });
  });
});
