import * as React from "react";
import moment from "moment";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { ChartProps, METRES_PER_KILOMETRE } from "./App";
import Metric from "./Metric";

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
    name: months[index][0],
    actual: Math.round(month),
    projected: Math.round(projected)
  }));

  return (
    <Metric title={title}>
      <ResponsiveContainer width={600} height={300}>
        <LineChart data={chartData}>
          <Line dataKey="actual" />
          <Line dataKey="projected" />
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </Metric>
  );
};

export default MonthlyBreakdown;
