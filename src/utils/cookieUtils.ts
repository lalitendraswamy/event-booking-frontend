
import Cookies from 'js-cookie';

export const setCookie = (name: string, value: string, days?: number) => {
  Cookies.set(name, value, { expires: days });
};

export const getCookie = (name: string) => {
  return Cookies.get(name) || "";
};

export const removeCookie = (name: string) => {
  Cookies.remove(name);
};


export const isAdmin = () => {
  return Cookies.get('role')==='admin';
};


export const clearAllCookies = () => {
  Object.keys(Cookies.get()).forEach((cookieName) => {
    Cookies.remove(cookieName);
  });
};