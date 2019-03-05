import * as React from "react";
import { render, cleanup, waitForElement } from "react-testing-library";
import axiosMock from "axios";
import App from "../App";

jest.mock("axios");

describe("DataFetcher", () => {
  afterEach(cleanup);

  it("should render its children", () => {
    axiosMock.get.mockResolvedValueOnce({
      data: [
        {
          start_date: "2019-01-01 00:00:00",
          distance: 10000
        }
      ]
    });

    const { container } = render(<App />);

    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(container.firstChild).toMatchSnapshot();
  });
});
