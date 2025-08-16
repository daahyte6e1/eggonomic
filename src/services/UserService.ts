import { APIManager } from '@/helpers';

export interface UserInfo {
  uid: string;
  key: string;
  uf_wallet_address?: string;
}

export class UserService {
  static async initializeUser(initDataRaw: string): Promise<UserInfo> {
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
    const result = {
      uid: res.user_info.uid,
      key: res.user_info.key,
      uf_wallet_address: res.uf_wallet_address || '',
    };

    console.log('UserService: Returning user info:', result);
    return result;
  }
}
