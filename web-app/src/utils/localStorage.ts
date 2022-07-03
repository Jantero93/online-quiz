const STORAGE_KEY = 'logged-data';

type LocalStorageLogin = {
  accessToken: string;
  refreshToken: string;
};

export const clearTokensLocalStorage = (): void =>
  localStorage.removeItem(STORAGE_KEY);

export const saveTokensLocalStorage = (
  accessToken: string,
  refreshToken: string
): void =>
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ accessToken, refreshToken })
  );

export const getTokenLocalStorage = (
  token: 'access' | 'refresh'
): string | null => {
  const JSONtokens = localStorage.getItem(STORAGE_KEY);

  if (JSONtokens == null) return null;

  const { accessToken, refreshToken } = JSON.parse(
    JSONtokens
  ) as LocalStorageLogin;

  return token == 'access' ? accessToken : refreshToken;
};
