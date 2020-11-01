import axios from 'axios';

const PER_PAGE = 200;

export const getStravaActivities = async (year: number) => {
  const authData = await axios.post('https://www.strava.com/oauth/token', {
    client_id: process.env.REACT_APP_STRAVA_KEY,
    client_secret: process.env.REACT_APP_STRAVA_SECRET,
    refresh_token: process.env.REACT_APP_STRAVA_REFRESH_TOKEN,
    grant_type: 'refresh_token',
  });

  const accessToken = authData.data.access_token;

  const startOfYear = new Date(`${year}-01-01`).getTime() / 1000;
  const endOfYear = new Date(`${year}-12-31`).getTime() / 1000;
  const activitiesData = await axios.get(
    'https://www.strava.com/api/v3/athlete/activities',
    {
      params: {
        after: startOfYear,
        before: endOfYear,
        per_page: PER_PAGE,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return activitiesData.data;
};
