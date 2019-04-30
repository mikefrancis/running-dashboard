import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";

import DataFetcher from "./DataFetcher";
import MonthlyBreakdown from "./MonthlyBreakdown";
import OverallProgress from "./OverallProgress";

const targetDistance = 500;

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }
`;

const StyledApp = styled.div`
  background-color: #1c3d5a;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;

  @media (min-width: ${props => props.theme.width.sm}) {
    align-items: center;
    display: flex;
  }
`;

const App = () => (
  <StyledApp>
    <GlobalStyle />
    <DataFetcher>
      {({ data, loading, error }) => {
        if (error) {
          return <span>{error.message}</span>;
        }

        if (loading) {
          return <span>Loading...</span>;
        }

        const chartProps = { data, targetDistance };

        return (
          <>
            <MonthlyBreakdown {...chartProps} title="Breakdown" />
            <OverallProgress {...chartProps} title="Progress" />
          </>
        );
      }}
    </DataFetcher>
  </StyledApp>
);

export default App;
