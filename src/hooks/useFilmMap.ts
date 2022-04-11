import useSWR from "swr";
import fetcher from "@src/lib/fetcher";
import { extractIdFromUrl } from "@lib/helper";

interface FilmRawDetails {
  episode_id: string;
  title: string;
  opening_crawl: string;
  director: string;
  producer: string;
  characters: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  planets: string[];
  release_date: string;
  created: string;
  edited: string;
  url: string;
}

interface FilmRawList {
  results: FilmRawDetails[];
  count: number;
  next: string;
  previous: string;
}

interface FilmDetails {
  title: string;
  episodeId: string;
  openingCrawl: string;
  director: string;
  producer: string;
  characters: number[];
  releaseDate: string;
}

interface FilmMap {
  [id: number]: FilmDetails;
}

export default function useFilmMap(): {
  filmMap: FilmMap | null;
  isLoading: boolean;
  isError: Error;
} {
  const { data, error } = useSWR<FilmRawList>(
    `https://swapi.dev/api/films`,
    fetcher,
  );

  if (data) {
    const { results: filmRawList } = data;

    let filmMap: FilmMap = {};

    for (const film of filmRawList) {
      const id = extractIdFromUrl(film.url);
      const characters = film.characters.map((character) =>
        extractIdFromUrl(character),
      );

      filmMap[id] = {
        title: film.title,
        episodeId: film.episode_id,
        openingCrawl: film.opening_crawl,
        director: film.director,
        producer: film.producer,
        characters,
        releaseDate: film.release_date,
      };
    }

    return {
      filmMap,
      isLoading: false,
      isError: error,
    };
  }

  return {
    filmMap: null,
    isLoading: true,
    isError: error,
  };
}
