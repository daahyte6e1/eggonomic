export interface UserInfo {
  level: string,
  uid: string;
  key: string;
  uf_wallet_address?: string;
}

export interface NFTInfo {
  "1_point_per_hours": number;
  apr: number;
  buy_points_price: number;
  buy_ton_price: number;
  checkin_price: number;
  id: number;
  incubation: boolean;
  insure_incubator_price: number;
  max_wth_tax: number;
  min_wth_tax: number;
  model: string;
  model_rare: string;
  name: string;
  pic: string;
  speedup_price: number;
  stake_by_model: boolean;
  stake_by_name: boolean;
  stakeable: boolean;
  upperdrop_chance_price: number;
}

export interface LoadNFTsResponse {
  nfts: NFTInfo[];
  result: boolean;
}

export interface ReferralInfo {
  earned: number;
  referrals_count: number;
  result: boolean;
  tax: number;
}