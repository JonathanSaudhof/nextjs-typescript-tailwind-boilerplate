import Home from "@/src/pages";
import { cleanup, render } from "@testing-library/react";

describe("Should render the first page on load", () => {
  const useRouter = jest.spyOn(require("next/router"), "useRouter");

  jest.mock("@/hooks/useHook", () => ({
    useHook: () => undefined,
  }));

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("It should be render character list on page 2", async () => {
    const mockRouter = {
      query: "",
    };

    useRouter.mockReturnValue(mockRouter);
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});
