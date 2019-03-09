import { Callback, Context, APIGatewayEvent } from "aws-lambda";
import { config } from "dotenv";
import fetch from "node-fetch";

config();

const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  try {
    const authResponse = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        client_id: process.env.REACT_APP_STRAVA_KEY,
        client_secret: process.env.REACT_APP_STRAVA_SECRET,
        refresh_token: process.env.REACT_APP_STRAVA_REFRESH_TOKEN,
        grant_type: "refresh_token"
      })
    });
    const authData = await authResponse.json();

    const accessToken = authData.access_token;

    const startOfYear =
      new Date(`${new Date().getFullYear()}-01-01`).getTime() / 1000;
    const response = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?after=${startOfYear}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    const data = await response.json();

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(data)
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
