import useSWR from "swr";
import fetcher from "@src/lib/fetcher";
import { prefetcher } from "@lib/helper";

interface FilmRawDetails {
  id: number;
  episodeId: string;
}

export default function useFilmDetails(id: number): {
  filmDetails: FilmRawDetails;
  isLoading: boolean;
  isError: Error;
} {
  const { data, error } = useSWR(`https://swapi.dev/api/films/${id}`, fetcher);

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

export function prefetchFilms(id: number) {
  const url = `https://swapi.dev/api/films/${id}/`;
  prefetcher(url);
}
