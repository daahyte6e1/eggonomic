import { useEffect, useState, useRef } from 'react'
import { useNotifications } from '@/context/NotificationContext'
import type { Notification } from '@/context/NotificationContext'

interface NotificationItemProps {
  notification: Notification
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const { removeNotification } = useNotifications()
  const [isVisible, setIsVisible] = useState(false)
  const removeNotificationRef = useRef(removeNotification)

  // Обновляем ref при изменении removeNotification
  useEffect(() => {
    removeNotificationRef.current = removeNotification
  }, [removeNotification])

  useEffect(() => {
    setIsVisible(true)

    if (notification.duration) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => removeNotificationRef.current(notification.id), 300)
      }, notification.duration)

      return () => clearTimeout(timer)
    }
  }, [notification.duration, notification.id]) // Убрали removeNotification из зависимостей

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => removeNotificationRef.current(notification.id), 300)
  }

  return (
    <div
      className={`
        notification-item
        notification-${notification.type}
        ${isVisible ? 'visible' : ''}
      `}
    >
      <div className='notification-content'>
        <div className='notification-main'>
          <div className='notification-text'>
            <h4 className='notification-title'>{notification.title}</h4>
            <p className='notification-message'>{notification.message}</p>
          </div>
        </div>
        <button
          onClick={handleClose}
          className='notification-close'
        >
          ✕
        </button>
      </div>
    </div>
  )
}
