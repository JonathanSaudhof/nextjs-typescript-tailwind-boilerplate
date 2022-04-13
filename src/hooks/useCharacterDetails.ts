import useSWR from "swr";
import fetcher from "@/lib/fetcher";

import { extractIdFromUrl, prefetcher } from "@/lib/helper";
import { CustomError } from "@/lib/customError";

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

interface CharacterDetails {
  name: string;
  hairColor: string;
  skinColor: string;
  birthYear: string;
  gender: string;
  films: number[];
  species: string[];
}

export function useCharacterDetails(id: number | null): {
  characterDetails: CharacterDetails | null;
  isLoading: boolean;
  isError: CustomError;
} {
  const { data, error } = useSWR<CharacterRawDetails>(
    id ? `https://swapi.dev/api/people/${id}` : null,
    fetcher,
  );

  if (data) {
    const {
      name,
      hair_color: hairColor,
      skin_color: skinColor,
      birth_year: birthYear,
      gender,
      films: rawFilms, // ids need to be extracted
      species,
    } = data;

    const films = rawFilms.map((film) => extractIdFromUrl(film));

    return {
      characterDetails: {
        name,
        hairColor,
        skinColor,
        birthYear,
        gender,
        films,
        species,
      },
      isLoading: false,
      isError: error,
    };
  }

  return {
    characterDetails: null,
    isLoading: true,
    isError: error,
  };
}

export async function prefetchCharacterDetails(id: number) {
  const url = `https://swapi.dev/api/people/?${id}`;
  prefetcher(url);
}
