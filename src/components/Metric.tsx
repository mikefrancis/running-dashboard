import * as React from "react";
import styled from "styled-components";

interface Props {
  children?: React.ReactNode;
  title: string;
}

const StyledMetric = styled.section`
  background-color: white;
  border-radius: 0.5rem;
  color: #111;
  margin: 1rem;
  padding: 1rem 2rem;
  width: 50%;

  h2 {
    font-size: 0.75rem;
    font-weight: normal;
    margin-bottom: 1rem;
    text-transform: uppercase;
  }
`;

const Metric: React.FunctionComponent<Props> = ({ children, title }) => (
  <StyledMetric>
    <h2>{title}</h2>
    {children}
  </StyledMetric>
);

export default Metric;
