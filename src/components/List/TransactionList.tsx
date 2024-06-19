import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  TransactionCategory,
  deleteTransaction,
  getAllTransactions,
} from "../../services/TransactionService";

import CreateTransactionDialog from "../Dialog/CreateTransactionDialog";
import DeleteConfirmationDialog from "../Dialog/DeleteConfirmationDialog";
import DeleteTransactionDialog from "../Dialog/DeleteTransactionDialog";
import EditTransactionDialog from "../Dialog/EditTransactionDialog";
import ViewTransactionDialog from "../Dialog/ViewTransactionDialog";

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionCategory | null>(null);
  const [hoveredTransaction, setHoveredTransaction] =
    useState<TransactionCategory | null>(null);
  const [selectedCreateTransaction, setSelectedCreateTransaction] =
    useState(false);
  const [selectedUpdateTransaction, setSelectedUpdateTransaction] = useState<
    number | null
  >(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteTransactionId, setDeleteTransactionId] = useState<number | null>(
    null
  );
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const loadTransactions = async (page: number) => {
    try {
      setLoading(true);
      const response = await getAllTransactions(page, 20, "Date", sortOrder);
      console.log(response);
      if (response.items.length === 0) {
        setHasMore(false);
      } else {
        setTransactions((prevTransactions) => [
          ...prevTransactions,
          ...response.items,
        ]);
      }

      setLoading(false);
    } catch (err: any) {
      console.error("Error loading transactions:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setTransactions([]);
    setCurrentPage(1);
    setHasMore(true);
    setError(null);
    setLoading(true);

    loadTransactions(1);
  }, [sortOrder]);

  useEffect(() => {
    if (currentPage > 1) {
      loadTransactions(currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        containerRef.current &&
        containerRef.current.scrollTop + containerRef.current.clientHeight >=
          containerRef.current.scrollHeight &&
        !loading &&
        hasMore
      ) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loading, hasMore]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const groupTransactionsByDate = (transactions: TransactionCategory[]) => {
    const grouped: {
      [key: string]: {
        transactions: TransactionCategory[];
        totalDifference: number;
      };
    } = {};

    transactions.forEach((transaction) => {
      const date = formatDate(transaction.date);
      if (!grouped[date]) {
        grouped[date] = { transactions: [], totalDifference: 0 };
      }
      if (transaction.transactionType === 1) {
        grouped[date].totalDifference += transaction.amount;
      } else {
        grouped[date].totalDifference -= Math.abs(transaction.amount);
      }
      grouped[date].transactions.push(transaction);
    });

    return grouped;
  };

  const handleOrderChange = (event: SelectChangeEvent<string>) => {
    setSortOrder(event.target.value);
  };

  const handleViewTransactionClick = (transaction: TransactionCategory) => {
    setSelectedTransaction(transaction);
  };

  const handleTransactionHover = (transaction: TransactionCategory | null) => {
    setHoveredTransaction(transaction);
  };

  const handleCloseDialog = () => {
    setSelectedTransaction(null);
    setSelectedCreateTransaction(false);
    setSelectedUpdateTransaction(null);
    setIsDeleteDialogOpen(false);
    setIsConfirmationDialogOpen(false);
    setDeleteSuccess(false);
    setDeleteError(null);
  };

  const handleUpdateTransaction = (transaction: TransactionCategory) => {
    setSelectedUpdateTransaction(transaction.id);
  };

  const handleDeleteTransaction = (transaction: TransactionCategory) => {
    setDeleteTransactionId(transaction.id);
    setIsConfirmationDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteTransactionId !== null) {
      try {
        await deleteTransaction(deleteTransactionId);
        setDeleteSuccess(true);
        setDeleteError(null);
        setTransactions((prevTransactions) =>
          prevTransactions.filter((t) => t.id !== deleteTransactionId)
        );
      } catch (err: any) {
        setDeleteSuccess(false);
        setDeleteError(err.message);
      } finally {
        setIsConfirmationDialogOpen(false);
        setIsDeleteDialogOpen(true);
      }
    }
  };

  const handleCreateTransactionClick = () => {
    setSelectedCreateTransaction(true);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <Typography variant="h4">TRANSACTIONS</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ backgroundColor: "#064aaf", color: "white" }}
            onClick={handleCreateTransactionClick}
          >
            Add Transaction
          </Button>
          <FormControl size="small">
            <InputLabel id="sort-order-label">Order</InputLabel>
            <Select
              labelId="sort-order-label"
              value={sortOrder}
              onChange={handleOrderChange}
            >
              <MenuItem value="asc">Asc</MenuItem>
              <MenuItem value="desc">Desc</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <div
        ref={containerRef}
        style={{ height: "70vh", overflowY: "auto", padding: "20px" }}
      >
        {Object.keys(groupTransactionsByDate(transactions)).map(
          (date, index) => (
            <Box key={`${date}-${index}`} sx={{ marginBottom: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ color: "#2b2929" }}>
                  {date}
                </Typography>
                <Typography variant="h6" sx={{ color: "#2b2929" }}>
                  {groupTransactionsByDate(transactions)[
                    date
                  ].totalDifference.toFixed(2)}
                </Typography>
              </Box>
              {groupTransactionsByDate(transactions)[date].transactions.map(
                (transaction) => (
                  <Box
                    key={transaction.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 1,
                      borderBottom: "1px solid grey",
                      cursor: "pointer",
                      backgroundColor:
                        hoveredTransaction === transaction
                          ? "white"
                          : "transparent",
                    }}
                    onMouseEnter={() => handleTransactionHover(transaction)}
                    onMouseLeave={() => handleTransactionHover(null)}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {transaction.category && transaction.category.icon && (
                        <img
                          style={{
                            borderRadius: "15px",
                            cursor: "pointer",
                            marginRight: "10px",
                          }}
                          src={`data:image/png;base64,${transaction.category.icon.base64Data}`}
                          alt={transaction.category.title}
                          width={25}
                          height={25}
                          title={transaction.category.title}
                        />
                      )}
                      <Typography variant="body2">
                        {transaction.category.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      {transaction.transactionType === 1 ? "+" : "-"}
                      {Math.abs(transaction.amount).toFixed(2)}
                    </Typography>
                    {hoveredTransaction === transaction && (
                      <Box>
                        <Button
                          size="small"
                          onClick={() =>
                            handleViewTransactionClick(transaction)
                          }
                          style={{
                            backgroundColor: "#064aaf",
                            color: "white",
                            marginRight: 5,
                          }}
                        >
                          View
                        </Button>
                        <Button
                          size="small"
                          onClick={() => handleUpdateTransaction(transaction)}
                          style={{
                            backgroundColor: "green",
                            color: "white",
                            marginRight: 5,
                          }}
                        >
                          Update
                        </Button>
                        <Button
                          size="small"
                          onClick={() => handleDeleteTransaction(transaction)}
                          style={{ backgroundColor: "#ba2222", color: "white" }}
                        >
                          Delete
                        </Button>
                      </Box>
                    )}
                  </Box>
                )
              )}
            </Box>
          )
        )}
        {loading && (
          <Typography variant="body2">Loading more transactions...</Typography>
        )}
        {!loading && !hasMore && transactions.length === 0 && (
          <Typography variant="body2">No transactions available</Typography>
        )}
        {!loading && hasMore && (
          <Typography
            variant="body2"
            style={{ textAlign: "center", marginTop: 20 }}
          >
            Scroll down to load more
          </Typography>
        )}
      </div>
      {selectedCreateTransaction && (
        <CreateTransactionDialog onClose={handleCloseDialog} />
      )}
      {selectedTransaction && (
        <ViewTransactionDialog
          transaction={selectedTransaction}
          isOpen={true}
          onClose={handleCloseDialog}
        />
      )}
      {selectedUpdateTransaction && (
        <EditTransactionDialog
          onClose={handleCloseDialog}
          transactionId={selectedUpdateTransaction}
        />
      )}
      <DeleteConfirmationDialog
        isOpen={isConfirmationDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
      />
      <DeleteTransactionDialog
        isOpen={isDeleteDialogOpen}
        isSuccess={deleteSuccess}
        message={
          deleteSuccess
            ? "Transaction successfully deleted."
            : `Error: ${deleteError}`
        }
        onClose={handleCloseDialog}
      />
    </div>
  );
};

export default TransactionList;
