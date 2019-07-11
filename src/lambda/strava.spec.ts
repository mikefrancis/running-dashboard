import axiosMock from "axios";

import { handler } from "./strava";

jest.mock("axios");

describe.only("strava lambda", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should get data", async () => {
    axiosMock.post = jest.fn(
      () =>
        Promise.resolve({
          data: {
            access_token: "someAccessToken"
          }
        }) as any
    );

    const data = [
      {
        foo: "bar"
      }
    ];

    axiosMock.get = jest.fn(
      () =>
        Promise.resolve({
          data
        }) as any
    );

    await handler({} as any, {} as any, (error, result) => {
      expect(error).toBeNull();
      expect(result.statusCode).toBe(200);
      expect(result.body).toBe(JSON.stringify(data));
    });
  });

  it("should get handle errors", async () => {
    axiosMock.post = jest.fn(() => Promise.reject({ message: "oh noez" }));

    await handler({} as any, {} as any, (error, result) => {
      expect(error).toBeNull();
      expect(result.statusCode).toBe(401);
    });
  });
});
