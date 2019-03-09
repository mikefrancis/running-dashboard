import * as React from "react";

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
      const response = await fetch("/.netlify/functions/strava");
      const data = await response.json();

      this.setState({ data, error: null, loading: false });
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
