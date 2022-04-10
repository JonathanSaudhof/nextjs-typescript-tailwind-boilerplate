import useCharacterList from "@hooks/useCharacterList";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Home = () => {
  const router = useRouter();
  const { page } = router.query;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { characterList, pages, isLoading, isError } =
    useCharacterList(currentPage);

  useEffect(() => {
    if (!page) {
      router.push("/?page=1");
    }

    if (page) {
      setCurrentPage(+page);
    }
  }, [page, router]);

  if (isLoading) {
    return <>Loading</>;
  }

  return (
    <div className='container mx-auto'>
      <h1 className='text-2xl'>Star Wars Fan Page</h1>
      <ul className='flex flex-col gap-6 p-6'>
        {characterList.length > 0 &&
          characterList.map((character) => (
            <li
              key={character.url}
              className='flex flex-col shadow-md bg-gray-500 border rounded p-6  '
            >
              <div>{character.name}</div>
              <div>{character.gender}</div>
              <div>
                {character.films.map((film) => (
                  <p key={film}>{film}</p>
                ))}
              </div>
            </li>
          ))}
      </ul>
      {pages && (
        <ul className='fixed bottom-0 flex gap-6 p-6 bg-gray-800 w-full'>
          Test
          {Array.apply(null, Array(pages)).map((_, index) => (
            <li key={index} className='text-white'>
              <Link href={`/?page=${index + 1}`}>{`Seite ${index + 1}`}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
