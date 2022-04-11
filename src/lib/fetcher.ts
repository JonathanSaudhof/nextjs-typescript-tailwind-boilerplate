export default async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (res.status !== 200) {
    const error = new Error("An error occurred while fetching the data.");
    throw error;
  }

  return res.json();
}
