import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton
} from "@mui/material";
import React from "react";
import CategoryForm from "../Form/CategoryForm";

interface CreateCategoryDialogProps {
  onClose: () => void;
}

const CreateCategoryDialog: React.FC<CreateCategoryDialogProps> = ({
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
        <CategoryForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryDialog;
