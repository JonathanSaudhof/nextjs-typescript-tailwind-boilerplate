import useSWR from "swr";

const ITEMS_PER_PAGE = 10;
const fetcher = (url: string) => fetch(url).then((r) => r.json());

export type CharacterRawListItem = {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
};

export type SwapiPeopleReturn = {
  count: number;
  next: string;
  previous: string | null;
  results: CharacterRawListItem[];
};

export default function useCharacterList(page: number): {
  characterList: CharacterRawListItem[] | [];
  currentPage: number;
  pages: number | null;
  isLoading: boolean;
  isError: Error;
} {
  const { data, error } = useSWR<SwapiPeopleReturn | undefined>(
    `https://swapi.dev/api/people/?page=${page}`,
    fetcher,
  );

  let numberOfPages: number | null = null;
  let characterList: any[] = [];

  if (data) {
    const { count, results } = data;

    numberOfPages = Math.round(+count / ITEMS_PER_PAGE);
    characterList = results;
    return {
      characterList,
      currentPage: page,
      pages: numberOfPages,
      isLoading: false,
      isError: error,
    };
  }

  return {
    characterList: [],
    currentPage: page,
    pages: numberOfPages,
    isLoading: true,
    isError: error,
  };
}

/**
 * extractCharacterListInformation
 * @description Get a subset of data from the raw characters list retruned from the api
 * to be shown in the list view
 */
// function extractCharacterListInformation(
//   characterRawList: CharacterRawListItem[],
// ): {
//   id: string;
//   name: string;
// }[] {
//   // TODO: Add more
//   return characterRawList.map((character) => {
//     // get ID from URL
//     const urlPathname = new URL(character.url).pathname;
//     const pathItems = urlPathname.split("/").filter((item) => item !== "");
//     const id = pathItems.slice(-1)[0];

//     return {
//       id,
//       name: character.name,
//     };
//   });
// }
