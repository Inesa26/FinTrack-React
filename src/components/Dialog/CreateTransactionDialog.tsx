import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton
} from "@mui/material";
import React from "react";
import TransactionForm from "../Form/TransactionForm";

interface CreateTransactionDialogProps {
  onClose: () => void;
}

const CreateTransactionDialog: React.FC<CreateTransactionDialogProps> = ({
  onClose,
}) => {
  return (
    <Dialog
      open={true}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialogTitle-root": {
          backgroundColor: "#064aaf",
          color: "white",
        },
        "& .MuiDialogContent-root": {
          backgroundColor: "white",
          padding: "20px",
        },
      }}
    >
      <DialogTitle>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton sx={{ color: "white" }} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <TransactionForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTransactionDialog;
