import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ChartProps, METRES_PER_KILOMETRE } from "./App";
import Metric from "./Metric";

const OverallProgress: React.FunctionComponent<ChartProps> = ({
  data,
  targetDistance,
  title
}) => {
  const totalDistance =
    data.reduce(
      (previousValue, activity) => previousValue + activity.distance,
      0
    ) / METRES_PER_KILOMETRE;

  const chartData = [
    {
      name: "Total distance",
      value: totalDistance
    },
    {
      name: "Target distance",
      value: targetDistance - totalDistance
    }
  ];
  return (
    <Metric title={title}>
      <div className="relative">
        <div className="absolute pin flex flex-col items-center justify-center">
          <span className="text-5xl">{Math.round(totalDistance)}</span>
          <span className="uppercase text-sm tracking-wide">KM</span>
        </div>
        <ResponsiveContainer width={300} height={300}>
          <PieChart>
            <Pie
              activeIndex={0}
              dataKey="value"
              data={chartData}
              innerRadius="60%"
              outerRadius="80%"
              fill="#DAE1E7"
            >
              <Cell fill="#3490DC" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Metric>
  );
};

export default OverallProgress;
