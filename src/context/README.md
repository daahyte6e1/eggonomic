# Глобальный State для данных пользователя

## Описание

В проекте реализован глобальный state для хранения данных пользователя с использованием React Context API.

## Структура данных

```typescript
interface UserInfo {
  uid: string | null;           // ID пользователя
  key: string | null;           // Ключ пользователя
  uf_wallet_address: string | null; // Адрес кошелька
}
```

## Использование

### 1. В компоненте Home (автоматическое сохранение)

```typescript
import { useUserContext } from '@/context/UserContext';

export const Home: FC = () => {
  const { setUserInfo } = useUserContext();
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await APIManager.post('/eggs/api/initdata', jsondata);
      
      // Автоматически сохраняем данные пользователя
      if (res && res.user_info) {
        setUserInfo({
          uid: res.user_info.uid,
          key: res.user_info.key,
          uf_wallet_address: res.uf_wallet_address,
        });
      }
    };
    
    fetchData();
  }, []);
};
```

### 2. В любом компоненте (чтение данных)

```typescript
import { useUserData } from '@/hooks/useUserData';

export const MyComponent: FC = () => {
  const { uid, key, uf_wallet_address, isAuthenticated } = useUserData();
  
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>UID: {uid}</p>
          <p>Wallet: {uf_wallet_address}</p>
        </div>
      ) : (
        <p>Пользователь не авторизован</p>
      )}
    </div>
  );
};
```

### 3. Прямое использование контекста

```typescript
import { useUserContext } from '@/context/UserContext';

export const MyComponent: FC = () => {
  const { userInfo, setUserInfo, clearUserInfo } = useUserContext();
  
  const handleLogout = () => {
    clearUserInfo();
  };
  
  const updateWallet = (newAddress: string) => {
    setUserInfo({ uf_wallet_address: newAddress });
  };
};
```

## Доступные методы

- `setUserInfo(info: Partial<UserInfo>)` - обновить частично или полностью данные пользователя
- `clearUserInfo()` - очистить все данные пользователя
- `isAuthenticated` - булево значение, показывающее авторизован ли пользователь

## Архитектура

```
UserProvider (Root.tsx)
    ↓
  App.tsx
    ↓
  Все компоненты имеют доступ к userInfo
```

Глобальный state автоматически обновляется при получении ответа от API в компоненте Home.
