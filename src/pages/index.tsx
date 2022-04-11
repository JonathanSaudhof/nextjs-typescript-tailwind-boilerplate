import useCharacterList from "@hooks/useCharacterList";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { prefetchCharacterList } from "@hooks/useCharacterList";

const Home = () => {
  const router = useRouter();
  const { page } = router.query;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { characterList, pages, isLoading, isError } =
    useCharacterList(currentPage);

  useEffect(() => {
    if (!page) {
      router.push("/?page=1");
    } else {
      setCurrentPage(+page);
    }
  }, [page, router]);

  if (isLoading) {
    return <>Loading</>;
  }

  return (
    <div className='container mx-auto'>
      {/* HEADER */}
      <div className='fixed top-0 w-full py-6 bg-gray-800'>
        <h1 className='text-2xl'>Star Wars Fan Page</h1>
      </div>
      {/* LIST */}
      <ul className='flex flex-col gap-6 py-20'>
        {characterList.length > 0 &&
          characterList.map((character) => (
            <li
              key={character.url}
              className='flex flex-col shadow-md bg-gray-500 border rounded'
            >
              <Link href='/characters/1'>
                <a>{character.name}</a>
              </Link>
              <div>{character.gender}</div>
              <div>{character.url}</div>

              <div>
                {character.films.map((film) => (
                  <p key={film}>{film}</p>
                ))}
              </div>
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
                  onMouseEnter={prefetchCharacterList.bind(null, index + 1)}
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
