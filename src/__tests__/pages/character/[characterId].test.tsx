import CharacterDetails from "@/pages/character/[characterId]";
import { render, cleanup } from "@testing-library/react";
import { works, fails } from "../../__mocks__/mockCharacterDetails";
import filmMap from "../../__mocks__/mockFilmMap";

const useRouter = jest.spyOn(require("next/router"), "useRouter");

const useCharacterDetails = jest.spyOn(
  require("@/hooks/useCharacterDetails"),
  "useCharacterDetails",
);

jest.mock("@/hooks/useFilmMap", () => ({
  useFilmMap: () => filmMap,
}));

describe("Character Details Page", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  // Happy Path
  it("should render detail of character with id 1", async () => {
    const mockRouter = {
      query: {
        characterId: "1",
      },
    };

    useRouter.mockReturnValue(mockRouter);
    useCharacterDetails.mockImplementation(() => works);

    const { asFragment } = render(<CharacterDetails />);
    expect(useCharacterDetails).toHaveBeenCalledWith(1);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render detail of character with id 2", async () => {
    const mockRouter = {
      query: {
        characterId: "2",
      },
    };

    useRouter.mockReturnValue(mockRouter);
    useCharacterDetails.mockImplementationOnce(() => works);

    const { asFragment } = render(<CharacterDetails />);
    expect(useCharacterDetails).toHaveBeenCalledWith(2);
    expect(asFragment()).toMatchSnapshot();
  });

  // Wrong id
  it("should forward to 404 on wrong id", async () => {
    const mockRouter = {
      query: {
        characterId: "asdf",
      },
      push: jest.fn(),
    };

    useRouter.mockReturnValue(mockRouter);

    useCharacterDetails.mockImplementationOnce(() => fails);
    render(<CharacterDetails />);
    expect(useCharacterDetails).toHaveBeenCalledWith(null);
    expect(mockRouter.push).toHaveBeenCalledWith("/404");
  });
});
