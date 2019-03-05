import * as React from "react";

interface Props {
  children?: React.ReactNode;
  title: string;
}

const Metric: React.FunctionComponent<Props> = ({ children, title }) => (
  <div className="bg-white m-6 p-6 rounded text-black">
    <h2 className="text-xs mb-6 tracking-wide uppercase font-normal">
      {title}
    </h2>
    {children}
  </div>
);

export default Metric;
