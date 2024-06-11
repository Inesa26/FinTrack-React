import React, { useEffect, useState } from 'react';
import { fetchIcons, Icon, IconsResponse } from '../../services/IconService';
import PaginationRounded from '../Pagination/PaginationRounded';
import { Box } from '@mui/material';
import { TransactionType } from '../../interfaces/TransactionType';

interface IconListProps {
  onSelectIcon: (iconId: number) => void;
  transactionType: TransactionType; // Define transactionType as a prop
  //setTransactionType: React.Dispatch<React.SetStateAction<TransactionType>>;
}

const IconList: React.FC<IconListProps> = ({ onSelectIcon, transactionType }) => { // Receive transactionType as a prop
  const [iconsResponse, setIconsResponse] = useState<IconsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedIconId, setSelectedIconId] = useState<number | null>(null);

  useEffect(() => {
    const loadIcons = async (page: number, transactionType: TransactionType) => {
      try {
        const response = await fetchIcons(page, 20, transactionType);
        setIconsResponse(response);
      } catch (err: any) {
        setError(err.message);
      }
    };

    loadIcons(currentPage, transactionType); // Pass transactionType to the loadIcons function
  }, [currentPage, transactionType]);

  const handleIconClick = (iconId: number) => {
    setSelectedIconId(iconId);
    onSelectIcon(iconId);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!iconsResponse) {
    return <div>Loading icons...</div>;
  }

  return (
    <div>
      {iconsResponse.items && iconsResponse.items.length > 0 ? (
        iconsResponse.items.map((icon: Icon) => (
          <Box
            key={icon.id}
            onClick={() => handleIconClick(icon.id)}
            sx={{
              display: 'inline-block',
              padding: 1,
              border: selectedIconId === icon.id ? '1.5px solid #064aaf!important' : '1.5px solid white!important',
              borderRadius: '15px',
              cursor: 'pointer'
            }}
          >
            <img src={`data:image/png;base64,${icon.base64Data}`} alt={`Icon ${icon.id}`} width={50} height={50} />
          </Box>
        ))
      ) : (
        <div>No icons available</div>
      )}
      <PaginationRounded
        currentPage={currentPage} onPageChange={handlePageChange} totalItems={iconsResponse.totalCount} itemsPerPage={20} />
    </div>
  );
};

export default IconList;