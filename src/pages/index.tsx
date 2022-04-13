import Link from "next/link";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { useCharacterList } from "@/hooks/useCharacterList";
import { prefetchCharacterList } from "@/hooks/useCharacterList";
import { useFilmMap } from "@/src/hooks/useFilmMap";
import { Loading } from "@/components/Loading";
import { GenderSign } from "../components/GenderSign";
import { Table } from "../components/Table/Table";
import { TableCell } from "../components/Table/TableCell";

const Home = () => {
  const router = useRouter();
  // sets page by default to 1
  const page = parseInt(router.query.page as string) || 1;
  const { cache } = useSWRConfig();
  const {
    characterList,
    pages,
    isLoading: charactersIsLoading,
    isError: charactersIsError,
  } = useCharacterList(+page);

  const {
    filmMap,
    isLoading: filmsIsLoading,
    isError: filmsIsError,
  } = useFilmMap();

  function handleMouseEnter(page: number) {
    const url = `https://swapi.dev/api/people/?page=${page}`;
    if (cache.get(url) === undefined) {
      prefetchCharacterList(page);
    }
  }

  if (charactersIsError || filmsIsError) {
    // TODO: specify behavior
  }

  if (charactersIsLoading || filmsIsLoading) {
    return <Loading />;
  }

  return (
    <div className='container mx-auto'>
      {/* LIST */}
      <Table>
        <thead className='bg-gray-700 text-left'>
          <tr>
            <TableCell asHead>Name</TableCell>
            <TableCell asHead>Gender</TableCell>
            <TableCell asHead>Episodes</TableCell>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200 bg-gray-50'>
          {characterList.map((character) => (
            <tr key={character.id} className='py-4'>
              <TableCell className='w-1/5 underline'>
                <Link href={`/character/${character.id}`}>
                  <a>{character.name}</a>
                </Link>
              </TableCell>
              <TableCell className='w-1/5'>
                <GenderSign gender={character.gender} />
              </TableCell>
              <TableCell className='w-auto'>
                {filmMap &&
                  character.films.map((id) => filmMap[id].episodeId).join(", ")}
              </TableCell>
            </tr>
          ))}
        </tbody>
        <tfoot className='bg-gray-200'>
          <tr>
            <TableCell className='align-top'>Pages:</TableCell>
            <TableCell colSpan={2}>
              <ul className='flex flex-wrap gap-6 w-full py-1'>
                {Array.apply(null, Array(pages)).map((_, index) => (
                  <li key={index}>
                    <Link href={`/?page=${index + 1}`}>
                      <a
                        className={`p-2 ${
                          page === index + 1 ? "bg-gray-300 rounded" : ""
                        }`}
                        onMouseEnter={handleMouseEnter.bind(null, index + 1)}
                      >{`${index + 1}`}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </TableCell>
          </tr>
        </tfoot>
      </Table>

      {/* PAGE NAVIGATION */}
    </div>
  );
};

export default Home;
