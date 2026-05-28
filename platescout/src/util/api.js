const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const normalizedBaseUrl = configuredBaseUrl.replace(/\/+$/, "");

export function apiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBaseUrl}${normalizedPath}`;
}

