const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

export const API_BASE_URL = rawBaseUrl.replace(/\/$/, "");

export function buildApiUrl(path) {
  if (!API_BASE_URL) {
    return path;
  }

  return `${API_BASE_URL}${path}`;
}
