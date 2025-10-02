import type { FC } from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import './CountdownTimer.scss';

interface CountdownTimerProps {
  /** Unix timestamp в миллисекундах для целевого времени */
  targetTime?: number;
  /** Дата в формате YYYY-MM-DD (например, "2024-12-31") */
  targetDate?: string;
  /** Время в формате HH:MM:SS (например, "23:59:59") */
  targetTimeString?: string;
  /** Callback функция, вызываемая при завершении обратного отсчета */
  onComplete?: () => void;
}

/**
 * Компонент обратного отсчета времени
 * 
 * @param targetTime - Unix timestamp в миллисекундах (приоритетный параметр)
 * @param targetDate - Дата в формате YYYY-MM-DD
 * @param targetTimeString - Время в формате HH:MM:SS
 * @param onComplete - Callback при завершении отсчета
 * 
 * @example
 * // Использование с timestamp
 * <CountdownTimer targetTime={Date.now() + 3600000} />
 * 
 * @example
 * // Использование с датой и временем
 * <CountdownTimer targetDate="2024-12-31" targetTimeString="23:59:59" />
 * 
 * @example
 * // Использование только с датой (начало дня)
 * <CountdownTimer targetDate="2024-12-31" />
 */
export const CountdownTimer: FC<CountdownTimerProps> = ({ 
  targetTime,
  targetDate,
  targetTimeString,
  onComplete 
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 0, minutes: 0, seconds: 0 });
  
  const onCompleteRef = useRef(onComplete);
  const hasCompletedRef = useRef(false);
  const lastUpdateRef = useRef<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 0, minutes: 0, seconds: 0 });

  // Функция для вычисления целевого времени
  const getTargetTimestamp = useCallback((): number => {
    // Если передан готовый timestamp, используем его
    if (targetTime) {
      return targetTime;
    }

    // Если переданы дата и время, создаем timestamp
    if (targetDate && targetTimeString) {
      const [year, month, day] = targetDate.split('-').map(Number);
      const [hours, minutes, seconds] = targetTimeString.split(':').map(Number);
      
      const targetDateTime = new Date(year, month - 1, day, hours, minutes, seconds);
      return targetDateTime.getTime();
    }

    // Если передана только дата, используем начало дня
    if (targetDate) {
      const [year, month, day] = targetDate.split('-').map(Number);
      const targetDateTime = new Date(year, month - 1, day, 0, 0, 0);
      return targetDateTime.getTime();
    }

    // По умолчанию - 24 часа от текущего момента
    return Date.now() + 24 * 60 * 60 * 1000;
  }, [targetTime, targetDate, targetTimeString]);

  // Обновляем ref при изменении onComplete
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Сбрасываем флаг завершения при изменении параметров
    hasCompletedRef.current = false;
    
    const calculateTimeLeft = () => {
      const now = Date.now();
      const targetTimestamp = getTargetTimestamp();
      const difference = targetTimestamp - now;

      if (difference <= 0) {
        if (!hasCompletedRef.current) {
          setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
          hasCompletedRef.current = true;
          onCompleteRef.current?.();
        }
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const newTimeLeft = { hours, minutes, seconds };
      
      // Обновляем состояние только если время изменилось
      if (
        newTimeLeft.hours !== lastUpdateRef.current.hours ||
        newTimeLeft.minutes !== lastUpdateRef.current.minutes ||
        newTimeLeft.seconds !== lastUpdateRef.current.seconds
      ) {
        lastUpdateRef.current = newTimeLeft;
        setTimeLeft(newTimeLeft);
      }
    };
    
    // Устанавливаем начальное значение
    calculateTimeLeft();
    
    // Создаем интервал
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetTime, targetDate, targetTimeString, getTargetTimestamp]); // Все параметры времени в зависимостях

  const formatTime = (value: number): string => {
    return value.toString().padStart(2, '0');
  };

  return (
    <div className="countdown-timer content column">
      <div className="timer-display">
        <div className="time-unit">
          <span className="time-value">{formatTime(timeLeft.hours)}</span>
          <span className="time-label">часов</span>
        </div>
        <div className="time-separator">:</div>
        <div className="time-unit">
          <span className="time-value">{formatTime(timeLeft.minutes)}</span>
          <span className="time-label">мин</span>
        </div>
        <div className="time-separator">:</div>
        <div className="time-unit">
          <span className="time-value">{formatTime(timeLeft.seconds)}</span>
          <span className="time-label">сек</span>
        </div>
      </div>

      <div>
        <div className="timer-title">
          Stars Swap — Public Beta (7 days)
        </div>
        <div className="timer-description">
          Help us battle-test the new swap widget.
        </div>
      </div>
    </div>
  );
};

