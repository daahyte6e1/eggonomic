import {FC, createContext, useContext, useState, ReactNode, useCallback, useEffect} from 'react';
import { UserService } from '@/services/UserService';
import { APIManager } from '@/helpers/APIManager';
import {UserInfo, NFTInfo, LoadNFTsResponse, ReferralInfo} from '@/types';
import {getLevelMultiplierByKey} from "@/helpers/getLevelInfoByKey";


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
  availableNFTs: NFTInfo[];
  referralInfo: ReferralInfo | null;
  isAuthenticated: boolean;
  setUserInfo: (info: Partial<UserInfo>) => void;
  clearUserInfo: () => void;
  initializeUser: (initDataRaw: string) => Promise<void>;
  setUserPoints: (points: number) => void;
  loadUserData: () => Promise<void>;
  loadReferralInfo: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
  summarySpeed: number;
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

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [userInfo, setUserInfoState] = useState<UserInfo>({
    uid: '',
    key: '',
    uf_wallet_address: '',
    level: ''
  });
  const [summarySpeed, setSummarySpeed] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userPoints, setUserPointsState] = useState<number>(0);
  const [nftsData, setNftsData] = useState<NFTData[]>([]);
  const [availableNFTs, setAvailableNFTs] = useState<NFTInfo[]>([]);
  const [referralInfo, setReferralInfo] = useState<ReferralInfo | null>(null);

  const setUserInfo = useCallback((info: Partial<UserInfo>) => {
    setUserInfoState(prev => ({ ...prev, ...info }));
  }, []);

  const clearUserInfo = useCallback(() => {
    setUserInfoState({
      uid: '',
      key: '',
      uf_wallet_address: '',
      level: ''
    });
    setUserPointsState(0);
    setNftsData([]);
    setAvailableNFTs([]);
    setReferralInfo(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const loadReferralInfo = useCallback(async () => {
    if (!userInfo.key) return;

    try {
      const requestBody = JSON.stringify({key: userInfo.key});
      const response = await APIManager.post<ReferralInfo>('/eggs/api/load_ref_info', requestBody);

      if (response.result) {
        setReferralInfo(response);
      }
    } catch (err) {
      console.error('Ошибка загрузки реферальной информации:', err);
    }
  }, [userInfo.key]);

  const initializeUser = useCallback(async (initDataRaw: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const userData = await UserService.initializeUser(initDataRaw);

      setUserInfoState({
        uid: userData.uid,
        key: userData.key,
        uf_wallet_address: userData.uf_wallet_address || '',
        level: userData.level
      });

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
        
        const availableNFTsResponse = await APIManager.get<LoadNFTsResponse>('/eggs/api/load_nfts', userData.key);
        if (availableNFTsResponse.result && availableNFTsResponse.nfts) {
          setAvailableNFTs(availableNFTsResponse.nfts);
        }

        await loadReferralInfo();
      } catch {
        setError('Не удалось загрузить данные пользователя');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка инициализации пользователя';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [loadReferralInfo]);

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

      await loadReferralInfo();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка загрузки данных';
      setError(errorMessage);
      throw error;
    }
  }, [userInfo.key, loadReferralInfo]);

  useEffect(() => {
    const summarySpeed = nftsData.reduce((acc, nft) => {
      if (nft.count <= 0) return acc

      const speedInfo = availableNFTs.find(el => el.id === nft.gift_id)
      if (!speedInfo) return acc

      acc += (24 / speedInfo['1_point_per_hours'] * nft.count / 24) * getLevelMultiplierByKey(userInfo.level)
      return acc
    }, 0)
    setSummarySpeed(Number(summarySpeed.toFixed(1)))
  }, [nftsData, availableNFTs, userInfo.level]);

  const value: UserContextType = {
    setUserPoints,
    userInfo,
    userPoints,
    nftsData,
    availableNFTs,
    referralInfo,
    isAuthenticated: !!userInfo.key,
    setUserInfo,
    clearUserInfo,
    initializeUser,
    loadUserData,
    loadReferralInfo,
    isLoading,
    error,
    summarySpeed,
    clearError,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
