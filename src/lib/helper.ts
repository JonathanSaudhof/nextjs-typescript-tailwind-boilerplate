import { mutate } from "swr";
import fetcher from "@lib/fetcher";

export function extractIdFromUrl(url: string) {
  const urlPathname = new URL(url).pathname;
  const pathItems = urlPathname.split("/").filter((item) => item !== "");
  const id = pathItems.slice(-1)[0];

  return +id;
}

export function prefetcher(url: string) {
  mutate(url, fetcher(url));
}
