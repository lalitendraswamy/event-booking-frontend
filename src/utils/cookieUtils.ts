export const setCookie = (name: string, value: string) => {
  sessionStorage.setItem(name, value);
};

export const getCookie = (name: string) => {
  return sessionStorage.getItem(name) || "";
};

export const removeCookie = (name: string) => {
  sessionStorage.removeItem(name);
};

export const isAdmin = () => {
  return getCookie('role') === 'admin';
};

export const clearAllCookies = () => {
  sessionStorage.clear();
};
