import type { FC } from 'react';
import { useState, useRef, useEffect } from 'react';
import Lottie from 'lottie-react';
import './GiftDetailModal.scss';

interface LottieData {
  [key: string]: unknown;
}

interface GiftDetailModalProps {
  gift: {
    id: number;
    user_id: number;
    telegram_gift_id: string;
    telegram_gift_number: number;
    telegram_gift_name: string;
    telegram_gift_model: string;
    telegram_gift_backdrop: string;
    telegram_gift_symbol: string;
    pic_url: string;
    unix: number;
    data_url: string;
    msg_id: number;
    telegram_gift_model_rare: number;
    telegram_gift_backdrop_rare: number;
    telegram_gift_symbol_rare: number;
    last_user_id: number;
    staked: boolean;
    incubate: boolean;
    stakeable: boolean;
    incubation: boolean;
  };
  isOpen: boolean;
  onClose: () => void;
}

export const GiftDetailModal: FC<GiftDetailModalProps> = ({ gift, isOpen, onClose }) => {
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isLottieLoaded, setIsLottieLoaded] = useState(false);
  const [lottieData, setLottieData] = useState<LottieData | null>(null);
  const [isLottieLoading, setIsLottieLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);
  const currentYRef = useRef(0);

  // Загрузка Lottie анимации
  useEffect(() => {
    if (isOpen && gift.pic_url && !isLottieLoaded && !isLottieLoading) {
      setIsLottieLoading(true);
      
      fetch(gift.pic_url)
        .then(response => response.json())
        .then((data: LottieData) => {
          setLottieData(data);
          setIsLottieLoaded(true);
          setIsLottieLoading(true);
        })
        .catch(() => {
          setIsLottieLoading(true);
        });
    }
  }, [isOpen, gift.pic_url, isLottieLoaded, isLottieLoading]);

  // Сброс состояния при закрытии модала
  useEffect(() => {
    if (!isOpen) {
      setIsLottieLoaded(false);
      setLottieData(null);
      setIsLottieLoading(true);
    }
  }, [isOpen]);

  const handleCloseModal = () => {
    setDragOffset(1000);
    setTimeout(() => {
      onClose();
    }, 200);
    setTimeout(() => {
      setDragOffset(0);
    }, 400);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isOpen) return;
    setIsDragging(true);
    startYRef.current = e.touches[0].clientY;
    currentYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !isOpen) return;
    currentYRef.current = e.touches[0].clientY;
    const deltaY = currentYRef.current - startYRef.current;
    
    if (deltaY > 0) {
      setDragOffset(deltaY);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging || !isOpen) return;
    
    const deltaY = currentYRef.current - startYRef.current;
    const threshold = window.innerHeight * 0.3;
    
    if (deltaY > threshold) {
      handleCloseModal();
    } else {
      setDragOffset(0);
    }
    
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isOpen) return;
    setIsDragging(true);
    startYRef.current = e.clientY;
    currentYRef.current = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isOpen) return;
    currentYRef.current = e.clientY;
    const deltaY = currentYRef.current - startYRef.current;
    
    if (deltaY > 0) {
      setDragOffset(deltaY);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging || !isOpen) return;
    
    const deltaY = currentYRef.current - startYRef.current;
    const threshold = window.innerHeight * 0.3;
    
    if (deltaY > threshold) {
      handleCloseModal();
    } else {
      setDragOffset(0);
    }
    
    setIsDragging(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleCloseModal}>
      <div
        ref={modalRef}
        className={`modal-content ${isDragging ? 'dragging' : ''}`}
        style={{
          transform: `translateY(${dragOffset}px)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="drag-indicator"></div>
        </div>
        <div className="modal-body">
          <div className="gift-modal-image-container">
            {/* Показываем изображение пока Lottie не загрузился */}
            {!isLottieLoaded && (
              <img
                src={gift.data_url}
                alt={`${gift.telegram_gift_name} ${gift.telegram_gift_model}`}
                className="gift-modal-image"
              />
            )}
            
            {/* Показываем Lottie анимацию после загрузки */}
            {isLottieLoaded && lottieData && (
              <div className="gift-modal-lottie-container">
                <Lottie
                  animationData={lottieData}
                  loop={true}
                  autoplay={true}
                  className="gift-modal-lottie"
                />
              </div>
            )}
            
            {/* Индикатор загрузки Lottie */}
            {isLottieLoading && (
              <div className="gift-modal-loading">
                <div className="loading-spinner"></div>
                <p>Загрузка анимации...</p>
              </div>
            )}
          </div>
          <div className="gift-modal-info">
            <h2 className="gift-modal-name">{gift.telegram_gift_name}</h2>
            <p className="gift-modal-number">#{gift.telegram_gift_number}</p>
            <p className="gift-modal-model">{gift.telegram_gift_model}</p>
            {gift.telegram_gift_backdrop && (
              <p className="gift-modal-backdrop">Backdrop: {gift.telegram_gift_backdrop}</p>
            )}
            {gift.telegram_gift_symbol && (
              <p className="gift-modal-symbol">Symbol: {gift.telegram_gift_symbol}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
