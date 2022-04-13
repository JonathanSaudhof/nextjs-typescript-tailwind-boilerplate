import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { CharacterRawDetails } from "./useCharacterList";
import { extractIdFromUrl } from "@/lib/helper";
import { CustomError } from "@/lib/customError";

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
