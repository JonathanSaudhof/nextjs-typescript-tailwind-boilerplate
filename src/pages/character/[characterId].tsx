import { Loading } from "@/components/Loading";
import { useCharacterDetails } from "@/hooks/useCharacterDetails";
import { useFilmMap } from "@/hooks/useFilmMap";
import { useRouter } from "next/router";

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
    <div className='container mx-auto py-20'>
      <h1>{characterDetails?.name}</h1>
      <p>{characterDetails?.gender}</p>
      <p>{characterDetails?.birthYear}</p>
      <p>{characterDetails?.hairColor}</p>
      {filmMap && (
        <>
          <p className=''>Films</p>
          <ul className='gap-6'>
            {characterDetails?.films.map((film) => {
              const filmDetails = filmMap[film];
              return (
                <li className='py-6 flex gap-3' key={film}>
                  <div>{filmDetails.episodeId}</div>
                  <div>{filmDetails.title}</div>
                  <div>{filmDetails.director}</div>
                  <div>{filmDetails.openingCrawl}</div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default CharacterDetails;
