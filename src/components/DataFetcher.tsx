import * as React from "react";
import axios from "axios";

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

  async componentDidMount() {
    this.setState({ loading: true });

    try {
      const response = await axios.get("/.netlify/functions/strava");

      this.setState({ data: response.data, error: null, loading: false });
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
