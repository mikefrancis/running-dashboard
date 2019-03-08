import * as React from "react";
import moment from "moment";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { ChartProps, METRES_PER_KILOMETRE } from "./../types";
import Metric from "./Metric";
import theme from "../theme";

const MonthlyBreakdown: React.FunctionComponent<ChartProps> = ({
  data,
  targetDistance,
  title
}) => {
  const months = moment.months();
  const monthData = new Array(months.length).fill(0);
  const projected = targetDistance / months.length;

  data.forEach(activity => {
    const month = parseInt(moment(activity.start_date).format("M"), 10) - 1;

    monthData[month] =
      monthData[month] + activity.distance / METRES_PER_KILOMETRE;
  });

  const chartData = monthData.map((month, index) => ({
    name: months[index],
    actual: month > 0 ? Math.round(month) : null,
    projected: Math.round(projected)
  }));

  const lineProps = {
    unit: "km"
  };

  return (
    <Metric title={title}>
      <ResponsiveContainer width={600} height={300}>
        <LineChart data={chartData}>
          <Line
            {...lineProps}
            dataKey="actual"
            name="Actual"
            stroke={theme.colours.secondary}
          />
          <Line
            {...lineProps}
            dataKey="projected"
            name="Projected"
            stroke={theme.colours.primary}
          />
          <XAxis dataKey="name" tickFormatter={tick => tick[0]} />
          <CartesianGrid strokeDasharray="2 2" stroke="#DAE1E7" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </Metric>
  );
};

export default MonthlyBreakdown;
