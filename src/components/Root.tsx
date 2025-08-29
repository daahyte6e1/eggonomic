import { TonConnectUIProvider } from '@tonconnect/ui-react';

import { App } from '@/components/App.tsx';
import { ErrorBoundary } from '@/components/ErrorBoundary.tsx';
import { UserProvider } from '@/context/UserContext.tsx';
import { GiftProvider } from '@/context/GiftContext.tsx';
import { NotificationProvider } from '@/context/NotificationContext.tsx';
import { UserInitializer } from '@/components/UserInitializer.tsx';
import { publicUrl } from '@/helpers'

function ErrorBoundaryError({ error }: { error: unknown }) {
  return (
    <div>
      <p>An unhandled error occurred:</p>
      <blockquote>
        <code>
          {error instanceof Error
            ? error.message
            : typeof error === 'string'
              ? error
              : JSON.stringify(error)}
        </code>
      </blockquote>
    </div>
  );
}

export function Root() {
  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <TonConnectUIProvider
        manifestUrl={publicUrl('tonconnect-manifest.json')}
      >
        <UserProvider>
          <GiftProvider>
            <NotificationProvider>
              <UserInitializer>
                <App/>
              </UserInitializer>
            </NotificationProvider>
          </GiftProvider>
        </UserProvider>
      </TonConnectUIProvider>
    </ErrorBoundary>
  );
}
