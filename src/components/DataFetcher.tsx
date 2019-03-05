import * as React from "react";
import axios from "axios";
import moment from "moment";

interface State {
  data: any[];
  loading: boolean;
  error: Error | null;
}

interface Props {
  children(props: State): JSX.Element;
}

class DataFetcher extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      data: [],
      loading: false,
      error: null
    };
  }

  // async componentDidMount() {
  //   this.setState({ loading: true });

  //   try {
  //     const authResponse = await axios.post(
  //       "https://www.strava.com/oauth/token",
  //       {
  //         client_id: process.env.REACT_APP_STRAVA_KEY,
  //         client_secret: process.env.REACT_APP_STRAVA_SECRET,
  //         refresh_token: process.env.REACT_APP_STRAVA_REFRESH_TOKEN,
  //         grant_type: "refresh_token"
  //       }
  //     );

  //     const accessToken = authResponse.data.access_token;

  //     const response = await axios.get(
  //       "https://www.strava.com/api/v3/athlete/activities",
  //       {
  //         params: {
  //           after: moment()
  //             .startOf("year")
  //             .unix()
  //         },
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`
  //         }
  //       }
  //     );

  //     this.setState({ error: null, loading: false, data: response.data });
  //   } catch (error) {
  //     this.setState({ error, loading: false });
  //   }
  // }

  async componentDidMount() {
    this.setState({ loading: true });

    try {
      const response = await axios.get("/.netlify/functions/strava");

      this.setState({ error: null, loading: false, data: response.data });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  }

  render() {
    const { data, loading, error } = this.state;

    return this.props.children({ data, loading, error });
  }
}

export default DataFetcher;
