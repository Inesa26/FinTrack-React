import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton
} from "@mui/material";
import React from "react";
import UpdateTransactionForm from "../Form/UpdateTransactionForm";

interface UpdateTransactionDialogProps {
  onClose: () => void;
  transactionId: number;
}

const CreateTransactionDialog: React.FC<UpdateTransactionDialogProps> = ({
  onClose,
  transactionId,
}) => {
  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialogTitle-root": {
          backgroundColor: "green",
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
        <UpdateTransactionForm transactionId={transactionId} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTransactionDialog;
