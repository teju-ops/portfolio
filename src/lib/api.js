const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

export const API_BASE_URL = rawBaseUrl.replace(/\/$/, "");

export function buildApiUrl(path) {
  if (!API_BASE_URL) {
    return path;
  }

  return `${API_BASE_URL}${path}`;
}

export async function parseApiResponse(response, fallbackMessage) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  const responsePreview = text.trim().slice(0, 120);
  const message =
    response.status === 404
      ? "API endpoint was not found. Check that VITE_API_BASE_URL points to the deployed backend."
      : responsePreview || fallbackMessage;

  return {
    success: false,
    message,
  };
}
