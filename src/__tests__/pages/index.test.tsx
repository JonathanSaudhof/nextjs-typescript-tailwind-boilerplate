import Home from "@/src/pages";
import { cleanup, render, waitFor } from "@testing-library/react";
import { works } from "../__mocks__/mockCharacterList";
import filmMap from "../__mocks__/mockFilmMap";

describe("Should render the first page on load", () => {
  const useRouter = jest.spyOn(require("next/router"), "useRouter");

  const useCharactersList = jest.spyOn(
    require("@/hooks/useCharacterList"),
    "useCharacterList",
  );

  jest.mock("@/hooks/useFilmMap", () => ({
    useFilmMap: () => filmMap,
  }));

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("It should be render character list on page 1", async () => {
    const mockRouter = {
      query: {},
    };

    useRouter.mockReturnValue(mockRouter);
    useCharactersList.mockImplementation(() => works);

    const { asFragment } = render(<Home />);
    await waitFor(() => expect(useRouter).toHaveBeenCalled());
    expect(useCharactersList).toHaveBeenCalledWith(1);
    expect(asFragment()).toMatchSnapshot();
  });

  it("It should be render character list on page 2", async () => {
    const mockRouter = {
      query: {
        page: "2",
      },
    };

    useRouter.mockReturnValue(mockRouter);
    useCharactersList.mockImplementation(() => works);

    const { asFragment } = render(<Home />);
    await waitFor(() => expect(useRouter).toHaveBeenCalled());
    expect(useCharactersList).toHaveBeenCalledWith(2);
    expect(asFragment()).toMatchSnapshot();
  });
});
