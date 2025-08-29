# Система уведомлений

Система уведомлений предоставляет удобный способ отображения различных типов сообщений пользователю.

## Компоненты

### NotificationProvider
Контекст-провайдер для управления состоянием уведомлений. Должен быть обернут вокруг приложения.

### NotificationContainer
Компонент для отображения всех активных уведомлений. Автоматически размещается в правом верхнем углу экрана.

### NotificationItem
Отдельный компонент уведомления с анимацией появления/исчезновения.

## Типы уведомлений

- `success` - успешные операции (зеленый)
- `error` - ошибки (красный)
- `warning` - предупреждения (желтый)
- `info` - информационные сообщения (синий)

## Использование

### 1. Добавление уведомления

```tsx
import { useNotifications } from '@/context/NotificationContext'
import { createSuccessNotification } from '@/helpers'

function MyComponent() {
  const { addNotification } = useNotifications()
  
  const handleSuccess = () => {
    addNotification(createSuccessNotification(
      'Успех!', 
      'Операция выполнена успешно',
      5000 // длительность в миллисекундах (опционально)
    ))
  }
  
  return <button onClick={handleSuccess}>Показать уведомление</button>
}
```

### 2. Хелпер функции

```tsx
import { 
  createSuccessNotification,
  createErrorNotification,
  createWarningNotification,
  createInfoNotification
} from '@/helpers'

// Создание уведомлений разных типов
const successNotif = createSuccessNotification('Заголовок', 'Сообщение', 5000)
const errorNotif = createErrorNotification('Ошибка', 'Описание ошибки', 8000)
const warningNotif = createWarningNotification('Внимание', 'Предупреждение', 6000)
const infoNotif = createInfoNotification('Информация', 'Описание', 4000)
```

### 3. Программное управление

```tsx
const { 
  notifications, 
  removeNotification, 
  clearAllNotifications 
} = useNotifications()

// Удаление конкретного уведомления
removeNotification('notification-id')

// Очистка всех уведомлений
clearAllNotifications()
```

## Автоматическое управление

- Уведомления автоматически исчезают по истечении времени (если указан `duration`)
- Система автоматически очищает истекшие уведомления каждую секунду
- Анимации появления/исчезновения для плавного UX

## Стилизация

Уведомления используют обычные CSS классы и стилизуются через SCSS файлы:

- `NotificationSystem.scss` - основные стили для всех компонентов
- `NotificationItem.scss` - дополнительные стили для анимаций и адаптивности
- `styles.scss` - главный файл, импортирующий все стили

### Структура CSS классов:

- `.notification-container` - контейнер для всех уведомлений
- `.notification-item` - отдельное уведомление
- `.notification-{type}` - стили для конкретного типа (success, error, warning, info)
- `.notification-content` - внутренняя структура уведомления
- `.notification-main` - основная часть с иконкой и текстом
- `.notification-icon` - иконка типа уведомления
- `.notification-text` - контейнер для текста
- `.notification-title` - заголовок уведомления
- `.notification-message` - сообщение уведомления
- `.notification-close` - кнопка закрытия

### Кастомизация:

Все стили можно легко кастомизировать, изменив переменные SCSS в начале файла `NotificationSystem.scss`:

```scss
$notification-width: 320px;
$notification-border-radius: 8px;
$notification-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
$notification-transition: all 0.3s ease-in-out;
```
