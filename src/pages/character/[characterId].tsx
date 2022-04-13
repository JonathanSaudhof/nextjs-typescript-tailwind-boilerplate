import { Loading } from "@/components/Loading";
import { useCharacterDetails } from "@/hooks/useCharacterDetails";
import { useFilmMap } from "@/hooks/useFilmMap";
import { GenderSign } from "@/src/components/GenderSign";
import { useRouter } from "next/router";
import { BiChevronLeft } from "react-icons/bi";
const CharacterDetails = () => {
  const router = useRouter();
  const characterId = parseInt(router.query.characterId as string) || null;
  const {
    characterDetails,
    isLoading: characterDetailsIsLoading,
    isError: characterDetailsIsError,
  } = useCharacterDetails(characterId);

  const {
    filmMap,
    isLoading: filmListIsLoading,
    isError: filmListIsError,
  } = useFilmMap();

  if (characterDetailsIsError || filmListIsError) {
    router.push("/404");
  }

  if (characterDetailsIsLoading || filmListIsLoading) {
    return <Loading />;
  }
  return (
    <div className='container mx-auto'>
      <div className='shadow-lg overflow-hidden sm:rounded-md'>
        <div className='px-4 py-6 sm:px-6 bg-gray-700 flex gap-6 items-center'>
          <div
            className='absolute h-10 w-10 flex justify-center items-center rounded-full bg-gray-800 hover:cursor-pointer'
            onClick={() => router.back()}
          >
            <BiChevronLeft className='text-2xl font-medium' />
          </div>
          <h1 className='ml-14 text-lg leading-6 font-medium  text-gray-50'>
            {characterDetails?.name}
          </h1>
        </div>
        <div className='bg-gray-200  border-t border-gray-400 px-4 py-6 sm:p-0'>
          <dl className='sm:divide-y sm:divide-gray-400'>
            <div className='py-4 sm:py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='font-medium text-gray-900'>Gender</dt>
              <dd className='mt-1 text-gray-900 sm:mt-0 sm:col-span-2 flex items-center gap-6'>
                {<GenderSign gender={characterDetails?.gender} />}
                <span className='font-light italic'>
                  {characterDetails?.gender}
                </span>
              </dd>
            </div>
            <div className='py-4 sm:py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='font-medium text-gray-900'>Birth Year</dt>
              <dd className='mt-1 text-gray-900 sm:mt-0 sm:col-span-2'>
                {characterDetails?.birthYear}
              </dd>
            </div>
            <div className='py-4 sm:py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='font-medium text-gray-900'>Hair color:</dt>
              <dd className='mt-1 text-gray-900 sm:mt-0 sm:col-span-2'>
                {characterDetails?.hairColor}
              </dd>
            </div>
            <div className='py-4 sm:py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='font-medium text-gray-900'>Films</dt>
              <dd className='mt-1 text-gray-900 sm:mt-0 sm:col-span-2'>
                <ul
                  role='list'
                  className='border border-gray-400 rounded-md divide-y divide-gray-400'
                >
                  {filmMap &&
                    characterDetails?.films.map((film) => {
                      const filmDetails = filmMap[film];
                      return (
                        <li
                          className='pl-3 pr-4 py-6 flex flex-col gap-4 text-sm'
                          key={film}
                        >
                          <div className='font-bold'>
                            Episode {filmDetails?.episodeId} -{" "}
                            {filmDetails?.title}
                          </div>
                          <div>Director: {filmDetails?.director}</div>
                          <div>{filmDetails?.openingCrawl}</div>
                        </li>
                      );
                    })}
                  {}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
