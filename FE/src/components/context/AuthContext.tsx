import { LOCAL_STORAGE_KEYS } from '@/constants/LOCAL_STORAGE_KEYS';
import { GlobalApiResponse } from '@/types';
import { apiRouter } from '@/utils/api-router';
import React, { createContext, useEffect, useState } from 'react';

type UserInfoType = {
  accessToken: string;
  email: string;
  name: string;
};

const AuthContext = createContext<{
  isLoggedIn: boolean;
  userInfo?: UserInfoType;
  login: (payload: { email: string; password: string }) => void;
  logout: () => void;
}>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

// Auth provider component
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfoType | undefined>();

  const login = async (payload: { email: string; password: string }) => {
    // express login
    const res1 = await apiRouter('SIGN_IN', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    const { success: expressSuccess, data: expressData } = (await res1.json()) as GlobalApiResponse<UserInfoType>;

    if (!expressSuccess) {
      alert(expressData.message);
      return;
    }

    // next login
    const res2 = await apiRouter('SIGN_IN', { method: 'POST' }, { skipAuthorization: true, skipBaseUrl: true });
    const { success: nextSuccess, data: nextData } = (await res2.json()) as GlobalApiResponse<undefined>;

    if (!nextSuccess) {
      alert(nextData.message);
      return;
    }

    setIsLoggedIn(true);
    setUserInfo(expressData.result);

    localStorage.setItem(LOCAL_STORAGE_KEYS['IS_LOGGED_IN'], 'true');
    localStorage.setItem(LOCAL_STORAGE_KEYS['USER_INFO'], JSON.stringify(expressData.result));
  };

  const logout = async () => {
    const res = await apiRouter('SIGN_OUT', { method: 'POST' }, { skipAuthorization: true, skipBaseUrl: true });

    if (!res.ok) {
      alert('Logout failed');
      return;
    }

    setUserInfo(undefined);
    setIsLoggedIn(false);

    localStorage.clear();
  };

  // restore state from local storage
  useEffect(() => {
    const userInfo = localStorage.getItem(LOCAL_STORAGE_KEYS['USER_INFO']);
    const isLoggedIn = localStorage.getItem(LOCAL_STORAGE_KEYS['IS_LOGGED_IN']);

    if (!!isLoggedIn && !!userInfo) {
      setIsLoggedIn(true);
      setUserInfo(JSON.parse(userInfo));
      return;
    }

    logout();
  }, []);

  return <AuthContext.Provider value={{ isLoggedIn, login, logout, userInfo }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
