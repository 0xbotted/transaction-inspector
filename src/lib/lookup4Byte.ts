/* eslint-disable @typescript-eslint/no-explicit-any */
export async function lookupSelector(selector: string) {
  const url = `https://www.4byte.directory/api/v1/signatures/?hex_signature=${selector}`;
  const res = await fetch(url);
  const json = await res.json();
  return json.results.map((r: any) => r.text_signature);
}
