import { Callback, Context, APIGatewayEvent } from "aws-lambda";
import axios from "axios";
import moment from "moment";
import dotenv from "dotenv";

dotenv.config();

const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  try {
    const authResponse = await axios.post(
      "https://www.strava.com/oauth/token",
      {
        client_id: process.env.REACT_APP_STRAVA_KEY,
        client_secret: process.env.REACT_APP_STRAVA_SECRET,
        refresh_token: process.env.REACT_APP_STRAVA_REFRESH_TOKEN,
        grant_type: "refresh_token"
      }
    );

    const accessToken = authResponse.data.access_token;

    const response = await axios.get(
      "https://www.strava.com/api/v3/athlete/activities",
      {
        params: {
          after: moment()
            .startOf("year")
            .unix()
        },
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
