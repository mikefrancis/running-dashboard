import * as React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

import { ChartProps } from './../types';
import Metric from './Metric';
import theme from '../theme';
import { METRES_PER_KILOMETRE, TARGET_DISTANCE } from '../constants';

const StyledChart = styled.div`
  position: relative;
`;

const BigNumberContainer = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  flex-direction: column;
  letter-spacing: 0.05rem;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 0;
`;

const BigNumber = styled.span`
  font-size: 4rem;
`;

const OverallProgress: React.FunctionComponent<ChartProps> = ({ data }) => {
  const totalDistance =
    data.reduce(
      (previousValue, activity) => previousValue + activity.distance,
      0
    ) / METRES_PER_KILOMETRE;

  const chartData = [
    {
      name: 'Total distance',
      value: totalDistance,
    },
    {
      name: 'Target distance',
      value: TARGET_DISTANCE - totalDistance,
    },
  ];

  return (
    <Metric title="Progress">
      <StyledChart>
        <BigNumberContainer>
          <BigNumber>{Math.round(totalDistance)}</BigNumber>
          km
        </BigNumberContainer>
        <ResponsiveContainer height={300}>
          <PieChart>
            <Pie
              startAngle={0}
              activeIndex={0}
              dataKey="value"
              data={chartData}
              innerRadius="60%"
              outerRadius="80%"
              fill={theme.colours.primary}
            >
              <Cell fill={theme.colours.secondary} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </StyledChart>
    </Metric>
  );
};

export default OverallProgress;
