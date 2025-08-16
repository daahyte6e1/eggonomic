import { useUserContext } from '@/context/UserContext';

export const useUserData = () => {
  const { userInfo, userPoints, setUserInfo, clearUserInfo, initializeUser, isLoading, setUserPoints, loadUserBalance } = useUserContext();
  
  return {
    uid: userInfo.uid,
    key: userInfo.key,
    uf_wallet_address: userInfo.uf_wallet_address,
    setUserInfo,
    clearUserInfo,
    initializeUser,
    setUserPoints,
    loadUserBalance,
    isLoading,
    userPoints,
    isAuthenticated: !!(userInfo.uid && userInfo.key),
  };
};
