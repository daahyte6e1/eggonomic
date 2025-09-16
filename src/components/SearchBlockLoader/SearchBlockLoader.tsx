import type { FC } from 'react';
import './SearchBlockLoader.scss';

interface SearchBlockLoaderProps {
  className?: string;
}

export const SearchBlockLoader: FC<SearchBlockLoaderProps> = ({ className = '' }) => {
  return (
    <div className={`search-block-loader ${className}`}>
      <div className="loader-content">
        <div className="loader-card">
          <div className="loader-search-input shimmer"></div>
        </div>
      </div>
    </div>
  );
};
