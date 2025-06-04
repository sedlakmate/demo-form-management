import { useAuth } from "./AuthContext";

export function useAuthFetch() {
  const { token } = useAuth();

  return async (input: RequestInfo, init: RequestInit = {}) => {
    const headers = new Headers(init.headers || {});
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return fetch(input, { ...init, headers });
  };
}
