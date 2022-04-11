import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import useCharacterList from "@hooks/useCharacterList";
import { prefetchCharacterList } from "@hooks/useCharacterList";
import useFilmMap from "@src/hooks/useFilmMap";
import { Loading } from "@components/Loading";

const Home = () => {
  const router = useRouter();
  const { page } = router.query;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { cache } = useSWRConfig();

  const {
    characterList,
    pages,
    isLoading: charactersIsLoading,
    isError: charactersIsError,
  } = useCharacterList(currentPage);

  const {
    filmMap,
    isLoading: filmsIsLoading,
    isError: filmsIsError,
  } = useFilmMap();

  useEffect(() => {
    if (!page) {
      router.push("/?page=1");
    } else {
      setCurrentPage(+page);
    }
  }, [page, router]);

  // TODO: make better
  function handleMouseEnter(page: number) {
    const url = `https://swapi.dev/api/people/?page=${page}`;
    if (cache.get(url) === undefined) {
      prefetchCharacterList(page);
    }
  }

  if (charactersIsLoading || filmsIsLoading) {
    return <Loading />;
  }

  return (
    <div className='container mx-auto'>
      {/* LIST */}
      <ul className='flex flex-col gap-6 py-20'>
        {characterList.length > 0 &&
          characterList.map((character) => (
            <li
              key={character.url}
              className='flex flex-col shadow-md bg-gray-500 border rounded'
            >
              <Link href='/character/1'>
                <a>{character.name}</a>
              </Link>
              <div>{character.gender}</div>
              <div>{character.url}</div>
              {filmMap && (
                <div>
                  {character.films
                    .sort((a, b) => a - b)
                    .map((filmId: number) => {
                      const filmDetails = filmMap[filmId];
                      return (
                        <p
                          key={filmDetails.title}
                        >{`${filmDetails.episodeId}-${filmDetails.title}`}</p>
                      );
                    })}
                </div>
              )}
            </li>
          ))}
      </ul>
      {/* NAVIGATION */}
      {pages && (
        <ul className='fixed bottom-0 flex gap-6 py-6 bg-gray-800 w-full'>
          Seite
          {Array.apply(null, Array(pages)).map((_, index) => (
            <li key={index} className='text-white'>
              <Link href={`/?page=${index + 1}`}>
                <a
                  className={`p-2 ${
                    currentPage == index + 1 ? "text-white bg-gray-300" : ""
                  }`}
                  onMouseEnter={handleMouseEnter.bind(null, index + 1)}
                >{`${index + 1}`}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
