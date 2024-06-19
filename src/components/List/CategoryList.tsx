import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TransactionType } from "../../interfaces/TransactionType";
import {
  Category,
  GetAllCategoriesDto,
  getAllCategories,
} from "../../services/CategoryService";
import PaginationRounded from "../Pagination/PaginationRounded";

interface CategoryListProps {
  onSelectCategory: (categoryId: number) => void;
  transactionType: TransactionType;
  initialSelectedCategory?: number | null;
}

const CategoryList: React.FC<CategoryListProps> = ({
  onSelectCategory,
  transactionType,
  initialSelectedCategory,
}) => {
  const [categoriesResponse, setCategoriesResponse] =
    useState<GetAllCategoriesDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const loadCategories = async (
      page: number,
      transactionType: TransactionType
    ) => {
      try {
        const response = await getAllCategories(page, 10, transactionType);
        setCategoriesResponse(response);
      } catch (err: any) {
        setError(err.message);
      }
    };

    loadCategories(currentPage, transactionType);
  }, [currentPage, transactionType]);

  useEffect(() => {
    // Update selected category when initialSelectedCategory changes
    if (
      initialSelectedCategory !== undefined &&
      initialSelectedCategory !== null
    ) {
      setSelectedCategoryId(initialSelectedCategory);
    }
  }, [initialSelectedCategory]);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    onSelectCategory(categoryId);
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

  if (!categoriesResponse) {
    return <div>Loading categories...</div>;
  }

  return (
    <div>
      {categoriesResponse.items && categoriesResponse.items.length > 0 ? (
        categoriesResponse.items.map((category: Category) => (
          <Box
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            sx={{
              textAlign: "center",
              display: "inline-block",
              padding: 1,
            }}
          >
            {category.icon && (
              <div>
                <div style={{ fontSize: "12px" }}>{category.title}</div>
                <img
                  style={{
                    borderRadius: "15px",
                    cursor: "pointer",
                    marginLeft: "5px",
                    backgroundColor:
                      selectedCategoryId === category.id ? "#9bc4ff" : "white",
                  }}
                  src={`data:image/png;base64,${category.icon.base64Data}`}
                  alt={category.title}
                  width={50}
                  height={50}
                  title={category.title}
                />
              </div>
            )}
          </Box>
        ))
      ) : (
        <div>No categories available</div>
      )}
      <PaginationRounded
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalItems={categoriesResponse.totalCount}
        itemsPerPage={10}
      />
    </div>
  );
};

export default CategoryList;
