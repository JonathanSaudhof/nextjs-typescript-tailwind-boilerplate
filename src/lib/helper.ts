import { mutate } from "swr";
import fetcher from "@/lib/fetcher";

export function extractIdFromUrl(url: string) {
  const urlPathname = new URL(url).pathname;

  // split pathnames by "/" and filter empty items
  const pathItems = urlPathname.split("/").filter((item) => item !== "");

  // get the last item
  const id = pathItems.slice(-1)[0];

  // make sure id is a number
  return +id;
}

export function prefetcher(url: string) {
  mutate(url, fetcher(url), { revalidate: false });
}
