import { APIManager } from '@/helpers';
import { KEY_BY_LEVEL } from '@/helpers';
import {UserInfo} from '@/types';

export interface UserServiceResponse {
  result: boolean;
  show_msg?: string;
  user_info: {
    uid: string;
    key: string;
    level: number
  };
  uf_wallet_address?: string;
}


export class UserService {
  static async initializeUser(initDataRaw: string): Promise<UserInfo> {
    try {
      const jsondata = JSON.stringify({ initData: initDataRaw });
      const res = await APIManager.post<UserServiceResponse>('/eggs/api/initdata', jsondata);

      if (!res || !res.result || !res.user_info) throw new Error(res?.show_msg || 'Invalid response from server');

      const levelKey = KEY_BY_LEVEL[res.user_info.level as keyof typeof KEY_BY_LEVEL]

      const result: UserInfo = {
        uid: res.user_info.uid,
        key: res.user_info.key,
        level: levelKey,
        uf_wallet_address: res.uf_wallet_address || '',
      };

      return Promise.resolve(result);
    } catch (error) {
      console.error('Error sending init data:', error);
    }
  }
}
