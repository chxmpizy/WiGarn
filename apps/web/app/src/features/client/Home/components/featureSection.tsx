import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';

const FeatureSection = () => {
  const ft = useTranslations('Features');
  return (
    <div className="flex flex-col items-center justify-center py-2 text-4xl font-semibold text-[#154D71]">
      <div className="mb-10">
        <h1>{ft('title')}</h1>
      </div>
      <div className="grid grid-cols-4 gap-15">
        <div className="flex h-75 w-50 flex-col items-center justify-center rounded-lg bg-gray-50 shadow-2xl ring-2 ring-gray-200">
          <div className="flex h-15 w-15 items-center justify-center rounded-lg bg-[#96BF48]/30">
            <FontAwesomeIcon icon={faSearch} className="text-[#4CAF50]" />
          </div>
          <div className="my-5 flex flex-col items-center justify-center gap-3 px-5 text-center">
            <h1 className="text-lg font-extrabold">{ft('search')}</h1>
            <p className="text-center text-sm">{ft('search_desc')}</p>
          </div>
        </div>
        <div className="flex h-75 w-50 flex-col items-center justify-center rounded-lg bg-gray-50 shadow-2xl ring-2 ring-gray-200">
          <div className="flex h-15 w-15 items-center justify-center rounded-lg bg-[#FFE01B]/40">
            <FontAwesomeIcon icon={faShop} className="text-[#FFCC22]" />
          </div>
          <div className="my-5 flex flex-col items-center justify-center gap-3 px-5 text-center">
            <h1 className="text-lg font-extrabold">{ft('store')}</h1>
            <p className="text-center text-sm">{ft('store_desc')}</p>
          </div>
        </div>
        <div className="flex h-75 w-50 flex-col items-center justify-center rounded-lg bg-gray-50 shadow-2xl ring-2 ring-gray-200">
          <div className="flex h-15 w-15 items-center justify-center rounded-lg bg-[#FF9800]/30">
            <FontAwesomeIcon icon={faTruck} className="text-[#E37400]" />
          </div>
          <div className="my-5 flex flex-col items-center justify-center gap-3 px-5 text-center">
            <h1 className="text-lg font-extrabold">{ft('delivery')}</h1>
            <p className="text-center text-sm">{ft('delivery_desc')}</p>
          </div>
        </div>
        <div className="flex h-75 w-50 flex-col items-center justify-center rounded-lg bg-gray-50 shadow-2xl ring-2 ring-gray-200">
          <div className="flex h-15 w-15 items-center justify-center rounded-lg bg-[#F06A6A]/30">
            <FontAwesomeIcon icon={faCommentDots} className="text-[#D32D27]" />
          </div>
          <div className="my-5 flex flex-col items-center justify-center gap-3 px-5 text-center">
            <h1 className="text-lg font-extrabold">{ft('chat')}</h1>
            <p className="text-center text-sm">{ft('chat_desc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
