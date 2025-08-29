import { useEffect, useState } from 'react'
import { useNotifications } from '@/context/NotificationContext'
import type { Notification } from '@/context/NotificationContext'

interface NotificationItemProps {
  notification: Notification
}



const typeIcons = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ'
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const { removeNotification } = useNotifications()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    if (notification.duration) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => removeNotification(notification.id), 300)
      }, notification.duration)
      
      return () => clearTimeout(timer)
    }
  }, [notification.duration, notification.id, removeNotification])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => removeNotification(notification.id), 300)
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
          <div className='notification-icon'>
            {typeIcons[notification.type]}
          </div>
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
