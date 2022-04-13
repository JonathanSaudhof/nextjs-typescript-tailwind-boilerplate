import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { extractIdFromUrl, prefetcher } from "@/lib/helper";
import { CharacterRawDetails } from "./useCharacterDetails";

const ITEMS_PER_PAGE = 10;

export type CharcerRawList = {
  count: number;
  next: string;
  previous: string | null;
  results: CharacterRawDetails[];
};

interface CharcterDetails {
  id: number;
  name: string;
  gender: string;
  species: string[];
  birthYear: string;
  eyeColor: string;
  films: number[];
  url: string;
}

export function useCharacterList(page: number): {
  characterList: CharcterDetails[] | [];
  pages: number | null;
  isLoading: boolean;
  isError: Error;
} {
  const { data, error } = useSWR<CharcerRawList | undefined>(
    page ? `https://swapi.dev/api/people/?page=${page}` : null,
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
      pages: numberOfPages,
      isLoading: false,
      isError: error,
    };
  }

  return {
    characterList: [],
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
): CharcterDetails[] {
  return characterRawList.map((character) => {
    const id = extractIdFromUrl(character.url);

    const films = character.films.map((film) => {
      const id = extractIdFromUrl(film);

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
      url: character.url,
    };
  });
}

export async function prefetchCharacterList(page: number) {
  const url = `https://swapi.dev/api/people/?page=${page}`;
  prefetcher(url);
}
