import url from "url";

export function extractSearchParams(urlString: string) {
  const parsedUrl = url.parse(urlString);
  return parsedUrl.search || "";
}

export function appendRentalAPIParams(urlString: string) {
  const searchParams = new URLSearchParams(urlString);

  searchParams.set("is_format_data", "1");
  searchParams.set("is_new_list", "1");
  searchParams.set("type", "1");

  return searchParams.toString();
}

export function process591QueryUrl(urlString: string) {
  const search = extractSearchParams(urlString);

  return appendRentalAPIParams(search);
}
