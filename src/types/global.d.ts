import {TonConnectUI} from "@tonconnect/ui-react";

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

