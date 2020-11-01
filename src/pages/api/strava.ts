import { NextApiRequest, NextApiResponse } from 'next';

import { getStravaActivities } from '../../lib/getStravaActivities';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const year = request.query?.year || new Date().getFullYear();

  try {
    const activities = await getStravaActivities(year as number);

    response.status(200);
    response.send(activities);
  } catch (error) {
    response.status(401);
    response.send({
      error: error.message,
    });
  }
};

export default handler;
