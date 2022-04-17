import CustomError from './customError';
import { mutate } from 'swr';

/**
 * fetcher
 * @description fetcher to use in swr
 */
export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    switch (res.status) {
      case 404: {
        throw CustomError('Not found', 404);
      }
      default: {
        throw CustomError('Bad Request', 400);
      }
    }
  }

  return res.json();
}

/**
 * prefetcher
 * @description fetcher to use in swr to prefetch
 */
export function prefetcher(url: string) {
  mutate(url, fetcher(url), { revalidate: false });
}
