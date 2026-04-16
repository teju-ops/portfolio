const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "content-length",
  "host",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
]);

declare const Netlify: {
  env: {
    get(name: string): string | undefined;
  };
};

function getApiBaseUrl() {
  const baseUrl =
    Netlify.env.get("API_BASE_URL") ||
    Netlify.env.get("VITE_API_BASE_URL") ||
    "";

  return baseUrl.replace(/\/$/, "");
}

function createJsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default async function apiProxy(request: Request) {
  const apiBaseUrl = getApiBaseUrl();

  if (!apiBaseUrl) {
    return createJsonResponse(
      {
        success: false,
        message:
          "Backend API URL is not configured. Set API_BASE_URL or VITE_API_BASE_URL in Netlify.",
      },
      500
    );
  }

  const incomingUrl = new URL(request.url);
  const apiPath = incomingUrl.pathname.replace(/^\/api/, "");
  const targetUrl = `${apiBaseUrl}/api${apiPath}${incomingUrl.search}`;
  const headers = new Headers(request.headers);

  HOP_BY_HOP_HEADERS.forEach((header) => headers.delete(header));

  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
    redirect: "manual",
  });
  const responseHeaders = new Headers(response.headers);

  HOP_BY_HOP_HEADERS.forEach((header) => responseHeaders.delete(header));

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
}

export const config = {
  path: "/api/*",
};
