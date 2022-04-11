import CustomError from "./customError";

export default async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    switch (res.status) {
      case 404: {
        throw CustomError("Not found", 404);
      }
      default: {
        throw CustomError("Bad Request", 400);
      }
    }
  }

  return res.json();
}
