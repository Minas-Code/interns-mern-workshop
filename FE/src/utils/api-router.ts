import { API_ROUTES, BE_BASE_URL, PAGE_ROUTES } from '@/constants/API_ROUTES';
import { LOCAL_STORAGE_KEYS } from '@/constants/LOCAL_STORAGE_KEYS';

export const apiRouter = async (
  input: keyof typeof API_ROUTES,
  init?: RequestInit,
  options?: { skipAuthorization?: boolean; skipContentType?: boolean; skipCredentials?: boolean; skipBaseUrl?: boolean }
): Promise<Response> => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS['TOKEN']);
  const headers = new Headers(init?.headers);

  if (!options?.skipAuthorization) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  if (!options?.skipContentType) {
    headers.set('Content-Type', 'application/json');
  }
  if (!options?.skipCredentials) {
    headers.set('credentials', 'include');
  }

  
  const response = await fetch((!options?.skipBaseUrl ? BE_BASE_URL : '') + API_ROUTES[input], { ...init, headers });

  // handle 401 error
  if (response.status === 401) {
    alert('Unauthorized');
    await fetch(API_ROUTES.SIGN_OUT, { ...init, headers });

    localStorage.clear();
    window.location.href = PAGE_ROUTES.SIGN_IN;
  }

  return response;
};
