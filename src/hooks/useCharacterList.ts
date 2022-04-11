import useSWR from "swr";
import fetcher from "@lib/fetcher";
import { extractIdFromUrl, prefetcher } from "@lib/helper";
import { prefetchFilms } from "@hooks/useFilmDetails";
const ITEMS_PER_PAGE = 10;

export interface CharacterRawDetails {
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
}

export type SwapiPeopleReturn = {
  count: number;
  next: string;
  previous: string | null;
  results: CharacterRawDetails[];
};

export default function useCharacterList(page: number): {
  characterList: CharacterRawDetails[] | [];
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
    const { count, results: characterRawList } = data;
    numberOfPages = Math.round(+count / ITEMS_PER_PAGE);
    characterList = extractCharacterListItemInformation(characterRawList);

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
function extractCharacterListItemInformation(
  characterRawList: CharacterRawDetails[],
): {
  id: number;
  name: string;
  gender: string;
  species: string[];
  birthYear: string;
  eyeColor: string;
  films: number[];
}[] {
  // TODO: Add more
  return characterRawList.map((character) => {
    // get ID from URL
    const id = extractIdFromUrl(character.url);

    const films = character.films.map((film) => {
      const id = extractIdFromUrl(film);
      prefetchFilms(id);

      return id;
    });

    return {
      id,
      name: character.name,
      gender: character.gender,
      species: character.species,
      birthYear: character.birth_year,
      eyeColor: character.eye_color,
      films,
    };
  });
}

export function prefetchCharacterList(page: number) {
  const url = `https://swapi.dev/api/people/?page=${page}`;
  prefetcher(url);
}
