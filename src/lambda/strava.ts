import { Callback, Context, APIGatewayEvent } from "aws-lambda";
import { config } from "dotenv";
import axios from "axios";

config();

const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  try {
    const authData = await axios.post("https://www.strava.com/oauth/token", {
      client_id: process.env.REACT_APP_STRAVA_KEY,
      client_secret: process.env.REACT_APP_STRAVA_SECRET,
      refresh_token: process.env.REACT_APP_STRAVA_REFRESH_TOKEN,
      grant_type: "refresh_token"
    });

    const accessToken = authData.data.access_token;

    const startOfYear =
      new Date(`${new Date().getFullYear()}-01-01`).getTime() / 1000;
    const response = await axios.get(
      `https://www.strava.com/api/v3/athlete/activities?after=${startOfYear}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(response.data)
    });
  } catch (error) {
    console.log(error);

    callback(null, {
      statusCode: 401,
      body: JSON.stringify({
        error: error.message
      })
    });
  }
};

export { handler };
