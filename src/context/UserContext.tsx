import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserService } from '@/services/UserService';
import { APIManager } from '@/helpers/APIManager';

interface UserInfo {
  uid: string | null;
  key: string | null;
  uf_wallet_address: string | null;
}

interface UserContextType {
  userInfo: UserInfo;
  userPoints: number;
  setUserInfo: (info: Partial<UserInfo>) => void;
  clearUserInfo: () => void;
  initializeUser: (initDataRaw: string) => Promise<void>;
  setUserPoints: (points: number) => void;
  loadUserBalance: () => Promise<void>;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userInfo, setUserInfoState] = useState<UserInfo>({
    uid: null,
    key: null,
    uf_wallet_address: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const setUserInfo = (info: Partial<UserInfo>) => {
    setUserInfoState(prev => ({ ...prev, ...info }));
  };

  const clearUserInfo = () => {
    setUserInfoState({
      uid: null,
      key: null,
      uf_wallet_address: null,
    });
  };

  const [userPoints, setUserPointsState] = useState<number>(0)

  const initializeUser = async (initDataRaw: string) => {
    try {
      setIsLoading(true);
      const userData = await UserService.initializeUser(initDataRaw);

      setUserInfoState({
        uid: userData.uid,
        key: userData.key,
        uf_wallet_address: userData.uf_wallet_address || '',
      });

      // Загружаем баланс пользователя
      try {
        const balanceResponse = await APIManager.get<{result: boolean, stake_points_count: number}>('/eggs/api/load_stakes', userData.key);
        if (balanceResponse.result && balanceResponse.stake_points_count !== undefined) {
          setUserPointsState(balanceResponse.stake_points_count);
        }
      } catch (balanceError) {
        console.error('Error loading user balance:', balanceError);
        // Не прерываем инициализацию, если не удалось загрузить баланс
      }
    } catch (error) {
      console.error('Error initializing user:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const setUserPoints = (points: number) => {
    setUserPointsState(points)
  }

  const loadUserBalance = async () => {
    if (!userInfo.key) {
      console.error('Cannot load balance: user key is not available');
      return;
    }

    try {
      const balanceResponse = await APIManager.get<{result: boolean, stake_points_count: number}>('/eggs/api/load_stakes', userInfo.key);
      if (balanceResponse.result && balanceResponse.stake_points_count !== undefined) {
        setUserPointsState(balanceResponse.stake_points_count);
      }
    } catch (error) {
      console.error('Error loading user balance:', error);
      throw error;
    }
  };

  const value: UserContextType = {
    setUserPoints,
    userInfo,
    userPoints,
    setUserInfo,
    clearUserInfo,
    initializeUser,
    loadUserBalance,
    isLoading,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
