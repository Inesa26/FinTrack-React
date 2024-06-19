import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography
} from "@mui/material";
import React from "react";
import { TransactionCategory } from "../../services/TransactionService";

interface ViewTransactionDialogProps {
  transaction: TransactionCategory;
  isOpen: boolean;
  onClose: () => void;
}

const ViewTransactionDialog: React.FC<ViewTransactionDialogProps> = ({
  transaction,
  isOpen,
  onClose,
}) => {
  const { category } = transaction;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialogTitle-root": {
          backgroundColor: "#064aaf",
          color: "white",
        },
        "& .MuiDialogContent-root": {
          backgroundColor: "#dceaff",
          padding: "20px",
        },
        "& .MuiTypography-root": {
          marginBottom: "10px",
        },
        "& .MuiDialogActions-root": {
          padding: "10px 20px",
          justifyContent: "flex-end",
          backgroundColor: "white",
        },
      }}
    >
      <DialogTitle>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <img
            src={`data:image/png;base64,${category.icon.base64Data}`}
            alt={category.title}
            width={50}
            height={50}
          />

          <IconButton sx={{ color: "white" }} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ marginTop: "30px" }} variant="body1">
          Date: {formatDate(transaction.date)}
        </Typography>
        <Typography variant="body1">Category: {category.title}</Typography>
        <Typography variant="body1">
          Type: {transaction.transactionType === 1 ? "Income" : "Expense"}
        </Typography>
        <Typography variant="body1">
          Amount: {Math.abs(transaction.amount).toFixed(2)}
        </Typography>
        <Typography variant="body1">
          Description: {transaction.description}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTransactionDialog;
