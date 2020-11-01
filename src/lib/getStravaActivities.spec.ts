import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { getStravaActivities } from './getStravaActivities';

describe('getStravaActivities', () => {
  const startOfYear =
    new Date(`${new Date().getFullYear()}-01-01`).getTime() / 1000;

  it('should get data', async () => {
    const server = setupServer(
      rest.post('https://www.strava.com/oauth/token', (req, res, ctx) =>
        res(
          ctx.json({
            access_token: 'someAccessToken',
          })
        )
      ),
      rest.get(
        `https://www.strava.com/api/v3/athlete/activities?after=${startOfYear}&per_page=200`,
        (_, res, ctx) =>
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

    const response = await getStravaActivities(new Date().getFullYear());

    expect(response[0].distance).toBe(5000);

    server.close();
  });

  it('should handle errors', async () => {
    const server = setupServer(
      rest.post('https://www.strava.com/oauth/token', (req, res, ctx) =>
        res(
          ctx.status(400),
          ctx.json({
            message: 'Bad Request',
          })
        )
      )
    );
    server.listen();

    try {
      await getStravaActivities(new Date().getFullYear());
    } catch (error) {
      expect(error.message).toBe('Request failed with status code 400');
    }

    server.close();
  });
});
