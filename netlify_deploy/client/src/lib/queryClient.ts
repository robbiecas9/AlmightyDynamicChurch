import { QueryClient } from "@tanstack/react-query";

// No API calls needed for static site, simplify the queryClient
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// Create a simplified mock apiRequest for compatibility
export async function apiRequest(
  _path: string,
  _method: string = "GET",
  _body?: any,
  _headers: HeadersInit = {}
) {
  // In static version, we don't make real API calls
  // All operations happen through form submissions directly to Netlify
  console.log("Static site: API requests not supported");
  return null;
}
