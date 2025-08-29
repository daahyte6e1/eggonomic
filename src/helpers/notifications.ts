import type { Notification } from '@/context/NotificationContext'

export function createNotification(
  type: Notification['type'],
  title: string,
  message: string,
  duration?: number
): Omit<Notification, 'id' | 'createdAt'> {
  return {
    type,
    title,
    message,
    duration
  }
}

export function createSuccessNotification(title: string, message: string, duration = 5000) {
  return createNotification('success', title, message, duration)
}

export function createErrorNotification(title: string, message: string, duration = 8000) {
  return createNotification('error', title, message, duration)
}

export function createWarningNotification(title: string, message: string, duration = 6000) {
  return createNotification('warning', title, message, duration)
}

export function createInfoNotification(title: string, message: string, duration = 4000) {
  return createNotification('info', title, message, duration)
}
