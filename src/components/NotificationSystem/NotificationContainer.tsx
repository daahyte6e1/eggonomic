import { useEffect } from 'react'
import { useNotifications } from '@/context/NotificationContext'
import { NotificationItem } from './NotificationItem'
import './NotificationSystem.scss'

export function NotificationContainer() {
  const { notifications, removeExpiredNotifications } = useNotifications()

  useEffect(() => {
    const interval = setInterval(() => {
      removeExpiredNotifications()
    }, 1000)

    return () => clearInterval(interval)
  }, [removeExpiredNotifications])

  if (notifications.length === 0) return null

  return (
    <div className='notification-container'>
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  )
}
