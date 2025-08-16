import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { UserService } from '@/services/UserService';
import { APIManager } from '@/helpers/APIManager';

interface UserInfo {
  level: string,
  uid: string | null;
  key: string | null;
  uf_wallet_address: string | null;
}

interface NFTData {
  amount_to_checkin: number;
  apr: number;
  count: number;
  dop_points: number;
  gift_id: number;
  id: number;
  last_claim_unix: number;
  last_update_points_unix: number;
  model: string;
  model_rare: string;
  name: string;
  need_checkin: boolean;
  next_check_in: number;
  pic: string;
  points_today: number;
  points_total: number;
  unix_cycle: number;
  user_uid: number;
}

interface StakesResponse {
  result: boolean;
  stake_points_count: number;
  nfts: NFTData[];
}

interface UserContextType {
  userInfo: UserInfo;
  userPoints: number;
  nftsData: NFTData[];
  isAuthenticated: boolean;
  setUserInfo: (info: Partial<UserInfo>) => void;
  clearUserInfo: () => void;
  initializeUser: (initDataRaw: string) => Promise<void>;
  setUserPoints: (points: number) => void;
  loadUserData: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
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
    level: 'believer'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userPoints, setUserPointsState] = useState<number>(0);
  const [nftsData, setNftsData] = useState<NFTData[]>([]);

  const setUserInfo = useCallback((info: Partial<UserInfo>) => {
    setUserInfoState(prev => ({ ...prev, ...info }));
  }, []);

  const clearUserInfo = useCallback(() => {
    setUserInfoState({
      uid: null,
      key: null,
      uf_wallet_address: null,
      level: 'believer'
    });
    setUserPointsState(0);
    setNftsData([]);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const initializeUser = useCallback(async (initDataRaw: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const userData = await UserService.initializeUser(initDataRaw);

      setUserInfoState({
        uid: userData.uid,
        key: userData.key,
        uf_wallet_address: userData.uf_wallet_address || '',
        level: 'believer'
      });

      // Загружаем данные пользователя (баланс и NFT)
      try {
        const stakesResponse = await APIManager.get<StakesResponse>('/eggs/api/load_stakes', userData.key);
        if (stakesResponse.result) {
          if (stakesResponse.stake_points_count !== undefined) {
            setUserPointsState(stakesResponse.stake_points_count);
          }
          if (stakesResponse.nfts) {
            setNftsData(stakesResponse.nfts);
          }
        }
      } catch {
        // Не прерываем инициализацию, если не удалось загрузить данные
        setError('Не удалось загрузить данные пользователя');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка инициализации пользователя';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setUserPoints = useCallback((points: number) => {
    setUserPointsState(points);
  }, []);

  const loadUserData = useCallback(async () => {
    if (!userInfo.key) {
      setError('Невозможно загрузить данные: ключ пользователя недоступен');
      return;
    }

    try {
      setError(null);
      const stakesResponse = await APIManager.get<StakesResponse>('/eggs/api/load_stakes', userInfo.key);
      if (stakesResponse.result) {
        if (stakesResponse.stake_points_count !== undefined) {
          setUserPointsState(stakesResponse.stake_points_count);
        }
        if (stakesResponse.nfts) {
          setNftsData(stakesResponse.nfts);
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка загрузки данных';
      setError(errorMessage);
      throw error;
    }
  }, [userInfo.key]);

  const value: UserContextType = {
    setUserPoints,
    userInfo,
    userPoints,
    nftsData,
    isAuthenticated: !!userInfo.key,
    setUserInfo,
    clearUserInfo,
    initializeUser,
    loadUserData,
    isLoading,
    error,
    clearError,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
