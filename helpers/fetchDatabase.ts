import { firebaseDatabaseUrl } from '../config';

interface FetchDatabaseOptions {
  method: 'PUT';
  body: string;
}

export async function fetchDatabase<T>(
  path: string,
  options?: FetchDatabaseOptions
): Promise<T | null> {
  try {
    const res = await fetch(`${firebaseDatabaseUrl}${path}.json`, options);
    return await res.json();
  } catch (error) {
    return null;
  }
}
