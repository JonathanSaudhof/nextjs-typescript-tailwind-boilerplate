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
    female: <BsGenderFemale />,
    male: <BsGenderMale />,
    "n/a": <CgUnavailable />,
    unknown: <FaGenderless />,
    hermaphrodite: <BsGenderTrans />,
  };

  return <div title={gender}>{genderSign[gender]}</div>;
}
