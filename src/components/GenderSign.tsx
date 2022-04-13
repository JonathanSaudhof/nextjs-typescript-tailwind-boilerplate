import { BsGenderFemale, BsGenderMale, BsGenderTrans } from "react-icons/bs";
import { FaGenderless } from "react-icons/fa";
import { CgUnavailable } from "react-icons/cg";

interface GenderSignProps {
  gender?: string;
}

export function GenderSign({ gender = "unknown" }: GenderSignProps) {
  const genderSign: {
    [key: string]: JSX.Element;
  } = {
    female: <BsGenderFemale size='24' />,
    male: <BsGenderMale size='24' />,
    "n/a": <CgUnavailable size='24' />,
    none: <CgUnavailable size='24' />,
    unknown: <FaGenderless size='24' />,
    hermaphrodite: <BsGenderTrans size='24' />,
  };

  return <div title={gender}>{genderSign[gender]}</div>;
}
