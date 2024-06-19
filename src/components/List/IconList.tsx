import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TransactionType } from "../../interfaces/TransactionType";
import { GetAllIconsDto, Icon, getAllIcons } from "../../services/IconService";
import PaginationRounded from "../Pagination/PaginationRounded";

interface IconListProps {
  onSelectIcon: (iconId: number) => void;
  transactionType: TransactionType;
}

const IconList: React.FC<IconListProps> = ({
  onSelectIcon,
  transactionType,
}) => {
  const [iconsResponse, setIconsResponse] = useState<GetAllIconsDto | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedIconId, setSelectedIconId] = useState<number | null>(null);

  useEffect(() => {
    const loadIcons = async (
      page: number,
      transactionType: TransactionType
    ) => {
      try {
        const response = await getAllIcons(page, 20, transactionType);
        setIconsResponse(response);
      } catch (err: any) {
        setError(err.message);
      }
    };

    loadIcons(currentPage, transactionType);
  }, [currentPage, transactionType]);

  const handleIconClick = (iconId: number) => {
    setSelectedIconId(iconId);
    onSelectIcon(iconId);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
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
            style={{ marginLeft: "15px", marginRight: "15px" }}
            key={icon.id}
            onClick={() => handleIconClick(icon.id)}
            sx={{
              display: "inline-block",
              padding: 1,
              backgroundColor: selectedIconId === icon.id ? "#9bc4ff" : "white",
              borderRadius: "15px",
              cursor: "pointer",
            }}
          >
            <img
              src={`data:image/png;base64,${icon.base64Data}`}
              alt={`Icon ${icon.id}`}
              width={50}
              height={50}
            />
          </Box>
        ))
      ) : (
        <div>No icons available</div>
      )}
      <PaginationRounded
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalItems={iconsResponse.totalCount}
        itemsPerPage={20}
      />
    </div>
  );
};

export default IconList;
