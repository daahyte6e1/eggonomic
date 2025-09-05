import {useEffect, useMemo} from 'react';
import { Navigate, Route, Routes, HashRouter } from 'react-router-dom';
import { retrieveLaunchParams, useSignal, isMiniAppDark, requestFullscreen } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';

import { routes } from '@/navigation/routes.tsx';
import {NotificationContainer, useNotifications} from '@/components/NotificationSystem';
import {useUserContext} from '@/context/UserContext';
import {createErrorNotification} from '@/helpers';

export function App() {
  const {error} = useUserContext()
  const { addNotification } = useNotifications()

  const lp = useMemo(() => retrieveLaunchParams(), []);
  const isDark = useSignal(isMiniAppDark);

  useEffect(() => {
    if (!error) return

    addNotification(createErrorNotification('Ошибка!', error))
  }, [error, addNotification])
  useEffect(() => {
    console.log('xxxxxxx', lp.tgWebAppPlatform)
    const mobilePlatformList = ['android', 'ios']
    if (!mobilePlatformList.includes(lp.tgWebAppPlatform)) return

    requestFullscreen();
  }, [])

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}
    >
      <HashRouter>
        <Routes>
          {routes.map((route) => <Route key={route.path} {...route} />)}
          <Route path='*' element={<Navigate to='/'/>}/>
        </Routes>
        <NotificationContainer />
      </HashRouter>
    </AppRoot>
  );
}
