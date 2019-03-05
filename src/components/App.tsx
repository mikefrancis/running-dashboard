import * as React from "react";
import DataFetcher from "./DataFetcher";
import MonthlyBreakdown from "./MonthlyBreakdown";
import OverallProgress from "./OverallProgress";

const targetDistance = 500;
export const METRES_PER_KILOMETRE = 1000;

export interface ChartProps {
  data: any[];
  targetDistance: number;
  title: string;
}

const App = () => (
  <div className="bg-black text-white font-sans min-h-screen flex items-center justify-center">
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
  </div>
);

export default App;
