import { APIManager } from '@/helpers';

export interface UserInfo {
  uid: string;
  key: string;
  uf_wallet_address?: string;
}

export interface UserServiceResponse {
  result: boolean;
  show_msg?: string;
  user_info: {
    uid: string;
    key: string;
  };
  uf_wallet_address?: string;
}

export class UserService {
  static async initializeUser(initDataRaw: string): Promise<UserInfo> {
    try {
      // const jsondata = JSON.stringify({ initData: initDataRaw });
      // const res = await APIManager.post<UserServiceResponse>('/eggs/api/initdata', jsondata);
      //
      // if (!res || !res.result || !res.user_info) {
      //   throw new Error(res?.show_msg || 'Invalid response from server');
      // }
      // console.log('UserService: Starting initialization with initDataRaw:', initDataRaw);
      //
      // const jsondata = JSON.stringify({ initData: initDataRaw });
      // console.log('UserService: Sending request with data:', jsondata);
      //
      // const res = await APIManager.post('/eggs/api/initdata', jsondata);
      // console.log('UserService: API response received:', res);
      //
      // if (!res || !res.user_info) {
      //   console.error('UserService: Invalid response from server:', res);
      //   throw new Error('Invalid response from server');
      // }

      const res = {
        "result": true,
        "show_msg": "",
        "user_info": {
          "key": "SqsjveiLNrx5sAntpwPqxP3roywtUrUgZq6zQRQIgsQ8CXyvN6zH",
          "uid": "900008774"
        }
      }

      const result: UserInfo = {
        uid: res.user_info.uid,
        key: res.user_info.key,
        uf_wallet_address: res.uf_wallet_address || '',
      };

      return result;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to initialize user');
    }
  }
}
