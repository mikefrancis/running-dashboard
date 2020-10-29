import axiosMock from 'axios';

import handler from './strava';

jest.mock('axios');

describe('strava lambda', () => {
  const requestMock = jest.fn();
  const responseMock = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it.only('should get data', async () => {
    axiosMock.post = jest.fn(
      () =>
        Promise.resolve({
          data: {
            access_token: 'someAccessToken',
          },
        }) as any
    );

    const data = [
      {
        foo: 'bar',
      },
    ];

    axiosMock.get = jest.fn(
      () =>
        Promise.resolve({
          data,
        }) as any
    );

    await handler(requestMock, responseMock);
  });

  it('should get handle errors', async () => {
    axiosMock.post = jest.fn(() => Promise.reject({ message: 'oh noez' }));

    await handler({} as any, {} as any, (error, result) => {
      expect(error).toBeNull();
      expect(result.statusCode).toBe(401);
    });
  });
});
