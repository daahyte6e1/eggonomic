import { useUserContext } from '@/context/UserContext';

export const useUserData = () => {
  const { userInfo, userPoints, nftsData, setUserInfo, clearUserInfo, initializeUser, isLoading, setUserPoints, loadUserData } = useUserContext();
  
  return {
    uid: userInfo.uid,
    key: userInfo.key,
    uf_wallet_address: userInfo.uf_wallet_address,
    setUserInfo,
    clearUserInfo,
    initializeUser,
    setUserPoints,
    loadUserData,
    nftsData,
    isLoading,
    userPoints,
    isAuthenticated: !!(userInfo.uid && userInfo.key),
  };
};
