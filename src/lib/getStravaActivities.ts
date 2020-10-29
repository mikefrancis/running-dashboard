import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export const getStravaActivities = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  try {
    const authData = await axios.post('https://www.strava.com/oauth/token', {
      client_id: process.env.REACT_APP_STRAVA_KEY,
      client_secret: process.env.REACT_APP_STRAVA_SECRET,
      refresh_token: process.env.REACT_APP_STRAVA_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    });

    const accessToken = authData.data.access_token;

    const year = request.query?.year || new Date().getFullYear();
    const startOfYear = new Date(`${year}-01-01`).getTime() / 1000;
    const activitiesData = await axios.get(
      `https://www.strava.com/api/v3/athlete/activities?after=${startOfYear}&per_page=200`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    response.status(200);
    response.send(activitiesData.data);
  } catch (error) {
    response.status(401);
    response.send({
      error: error.message,
    });
  }
};
