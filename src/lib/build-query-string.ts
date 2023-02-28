export function buildQueryString<T extends Record<string, any>>(
  params?: T
): URLSearchParams {
  const query = new URLSearchParams();

  for (const key in params) {
    if (params[key]) {
      query.append(key, params[key]);
    }
  }

  return query;
}
