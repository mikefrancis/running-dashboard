import * as React from 'react';
import dayjs from 'dayjs';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { ChartProps } from './../types';
import Metric from './Metric';
import theme from '../theme';
import { METRES_PER_KILOMETRE, TARGET_DISTANCE } from '../constants';

const today = new Date();

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MonthlyBreakdown: React.FunctionComponent<ChartProps> = ({ data }) => {
  const monthData = new Array(MONTHS.length).fill(0);
  const projected = TARGET_DISTANCE / MONTHS.length;

  data.forEach((activity) => {
    const month = dayjs(activity.start_date).month();

    monthData[month] =
      monthData[month] + activity.distance / METRES_PER_KILOMETRE;
  });

  const chartData = monthData.map((month, index) => {
    const actual =
      month > 0 ? Math.round(month) : today.getMonth() >= index ? 0 : null;

    return {
      actual,
      name: MONTHS[index],
      projected: Math.round(projected),
    };
  });

  const lineProps = {
    unit: 'km',
  };

  return (
    <Metric title="Breakdown">
      <ResponsiveContainer height={300}>
        <LineChart data={chartData}>
          <Line
            {...lineProps}
            dataKey="actual"
            name="Actual"
            stroke={theme.colours.secondary}
            type="monotone"
          />
          <Line
            {...lineProps}
            dataKey="projected"
            name="Projected"
            stroke={theme.colours.primary}
          />
          <XAxis dataKey="name" tickFormatter={(tick) => tick[0]} />
          <CartesianGrid strokeDasharray="2 2" stroke="#DAE1E7" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </Metric>
  );
};

export default MonthlyBreakdown;
