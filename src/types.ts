interface Activity {
  distance: number;
  start_date: string;
}

export interface ChartProps {
  data: Activity[];
  targetDistance: number;
  title: string;
}

export const METRES_PER_KILOMETRE = 1000;
