import React from 'react';
import { Badge } from '@ui/badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons';

interface SizeProps {
  size: 'small' | 'medium' | 'large';
}

const SizeBadge = ({ size }: SizeProps) => {
  return (
    <div>
      {size === 'small' ? (
        <Badge
          variant="default"
          className="text-primary flex items-center gap-1 rounded-2xl bg-[#a1eba1] px-2 py-1"
        >
          <FontAwesomeIcon icon={faStore} />
          {size.toLocaleUpperCase()}
        </Badge>
      ) : size === 'medium' ? (
        <Badge
          variant="default"
          className="text-primary flex items-center gap-1 rounded-2xl bg-[#e5eba1] px-2 py-1"
        >
          <FontAwesomeIcon icon={faWarehouse} />
          {size.toLocaleUpperCase()}
        </Badge>
      ) : (
        <Badge
          variant="default"
          className="text-primary flex items-center gap-1 rounded-2xl bg-[#eba1a1] px-2 py-1"
        >
          <FontAwesomeIcon icon={faBuilding} />
          {size.toLocaleUpperCase()}
        </Badge>
      )}
    </div>
  );
};

export default SizeBadge;
