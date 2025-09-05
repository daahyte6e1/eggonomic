import type { FC } from 'react';
import {useState, ChangeEvent, useEffect} from 'react';
import './SearchBlock.scss'
import {SearchIcon} from '@/components/Icons'
import {getPageBackgroundColorByKey} from "@/helpers/getLevelInfoByKey";
import {useUserContext} from "@/context/UserContext";

interface SearchBlockProps {
  onSearch: (searchText: string) => void;
}

export const SearchBlock: FC<SearchBlockProps> = ({ onSearch }) => {
  const {userInfo} = useUserContext()
  const [searchText, setSearchText] = useState('');
  const [backgroundColorByKey, setBackgroundColorByKey] = useState<string[]>([])

  useEffect(() => {
    if (!userInfo.level) return

    const backgroundColorByKey = getPageBackgroundColorByKey(userInfo.level)
    setBackgroundColorByKey(backgroundColorByKey)
  }, [userInfo.level])
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value);
  };

  return (
    <div className='search-content content'>
      <div className='background'>
        <svg
          viewBox="0 0 392 49"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <g filter="url(#filter0_blur)">
            <ellipse cx="153.598" cy="241.021" rx="50" ry="185.5" fill={backgroundColorByKey[0]} />
          </g>


          <g filter="url(#filter1_blur)">
            <ellipse
              cx="195.103"
              cy="218.61"
              rx="50"
              ry="185.5"
              transform="rotate(16.1085 195.103 218.61)"
              fill={backgroundColorByKey[0]}
            />
          </g>


          <g filter="url(#filter2_blur)">
            <ellipse
              cx="201.197"
              cy="178.596"
              rx="50"
              ry="185.5"
              transform="rotate(32.217 201.197 178.596)"
              fill={backgroundColorByKey[1]}
            />
          </g>


          <defs>
            <filter
              id="filter0_blur"
              x="-229.402"
              y="-277.479"
              width="766"
              height="1037"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="166.5" result="effect1_foregroundBlur" />
            </filter>


            <filter
              id="filter1_blur"
              x="-97.2996"
              y="-182.155"
              width="584.806"
              height="801.53"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="111" result="effect1_foregroundBlur" />
            </filter>


            <filter
              id="filter2_blur"
              x="-36.3931"
              y="-110.617"
              width="475.18"
              height="578.425"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="65" result="effect1_foregroundBlur" />
            </filter>
          </defs>
        </svg>
      </div>
      <div className='card row'>
        <SearchIcon />
        <input
          type='text'
          placeholder='Поиск подарков в Инвентаре'
          value={searchText}
          onChange={handleInputChange}
          className='search-input'
        />
      </div>
    </div>
  );
};


