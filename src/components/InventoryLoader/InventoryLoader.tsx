import type { FC } from 'react';
import './InventoryLoader.scss';

interface InventoryLoaderProps {
  className?: string;
}

export const InventoryLoader: FC<InventoryLoaderProps> = ({ className = '' }) => {
  return (
    <div className={`inventory-loader ${className}`}>
      <div className="loader-content">
        <div className="loader-header">
          <div className="loader-balance">
            <div className="loader-balance-text shimmer"></div>
          </div>
          <div className="loader-level shimmer"></div>
          <div className="loader-staked">
            <div className="loader-staked-text shimmer"></div>
            <div className="loader-staked-value shimmer"></div>
          </div>
        </div>
        <div className="loader-grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="loader-gift-card">
              <div className="loader-gift-image shimmer">
                <div className="image" />
              </div>
              <div className="loader-gift-info">
                <div className="loader-gift-name shimmer"></div>
                <div className="loader-gift-number shimmer"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
