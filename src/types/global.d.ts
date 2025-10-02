interface TonConnectUI {
  // Add specific properties as needed
  [key: string]: unknown;
}

interface StarsSwapWidget {
  init: (config: { partnerUid: string }) => void;
  open: (config: { tonConnect: TonConnectUI }) => void;
}

declare global {
  interface Window {
    Buffer: typeof Buffer;
    process: typeof process;
    StarsSwapWidget: StarsSwapWidget;
  }
}

export {};

