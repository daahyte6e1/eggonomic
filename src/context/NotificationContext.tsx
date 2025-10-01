import { createContext, useContext, useReducer, ReactNode, useCallback } from 'react'

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
  createdAt: Date
}

interface NotificationState {
  notifications: Notification[]
}

type NotificationAction =
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id' | 'createdAt'> }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_ALL_NOTIFICATIONS' }
  | { type: 'REMOVE_EXPIRED_NOTIFICATIONS' }

const initialState: NotificationState = {
  notifications: []
}

function notificationReducer(state: NotificationState, action: NotificationAction): NotificationState {
  switch (action.type) {
    case 'ADD_NOTIFICATION': {
      const newNotification: Notification = {
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: new Date()
      }
      return {
        ...state,
        notifications: [...state.notifications, newNotification]
      }
    }
    
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== action.payload)
      }
    
    case 'CLEAR_ALL_NOTIFICATIONS':
      return {
        ...state,
        notifications: []
      }
    
    case 'REMOVE_EXPIRED_NOTIFICATIONS': {
      const now = new Date()
      return {
        ...state,
        notifications: state.notifications.filter(notification => {
          if (!notification.duration) return true
          const expirationTime = new Date(notification.createdAt.getTime() + notification.duration)
          return now < expirationTime
        })
      }
    }
    
    default:
      return state
  }
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void
  removeNotification: (id: string) => void
  clearAllNotifications: () => void
  removeExpiredNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(notificationReducer, initialState)

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'createdAt'>) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification })
  }, [])

  const removeNotification = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id })
  }, [])

  const clearAllNotifications = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL_NOTIFICATIONS' })
  }, [])

  const removeExpiredNotifications = useCallback(() => {
    dispatch({ type: 'REMOVE_EXPIRED_NOTIFICATIONS' })
  }, [])

  const value: NotificationContextType = {
    notifications: state.notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    removeExpiredNotifications
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}
