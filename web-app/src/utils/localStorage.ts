import moment from 'moment';

const LOGGING_TIME = 3;
const STORAGE_KEY = 'logged-data';

type LocalStorageLogin = {
  email: string;
  logExpires: string;
};

export const clearLoginData = () => localStorage.removeItem(STORAGE_KEY);

export const isLogged = (): boolean => {
  const JSONData = localStorage.getItem(STORAGE_KEY);

  if (JSONData == null) return false;

  const data: LocalStorageLogin = JSON.parse(JSONData);

  const now = moment();
  const expires = moment(data.logExpires);

  return expires.isAfter(now);
};

export const saveLogToLocalStorage = (email: string): void => {
  const storageLogin: LocalStorageLogin = {
    email,
    logExpires: moment().add(LOGGING_TIME, 'hour').toISOString()
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storageLogin));
};
