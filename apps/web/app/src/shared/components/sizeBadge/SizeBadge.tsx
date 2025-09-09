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
        <Badge variant="default" className="bg-[#8bfa8b]">
          <FontAwesomeIcon icon={faStore} />
          {size.toLocaleUpperCase()}
        </Badge>
      ) : size === 'medium' ? (
        <Badge variant="default">
          <FontAwesomeIcon icon={faWarehouse} className="bg-[#faf68b]" />
          {size.toLocaleUpperCase()}
        </Badge>
      ) : (
        <Badge variant="default">
          <FontAwesomeIcon icon={faBuilding} className="bg-[#fa8b8b]" />
          {size.toLocaleUpperCase()}
        </Badge>
      )}
    </div>
  );
};

export default SizeBadge;
