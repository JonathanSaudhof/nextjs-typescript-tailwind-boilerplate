import useCharacterDetails from "@src/hooks/useCharacterDetails";
import { useRouter } from "next/router";

const CharacterDetails = () => {
  const router = useRouter();
  const characterId = router.query.characterId as string;

  const { characterDetails, isLoading, isError } =
    useCharacterDetails(characterId);

  console.log("isError", isError);

  if (isError) {
    router.push("/404");
  }

  return <></>;
};

export default CharacterDetails;
