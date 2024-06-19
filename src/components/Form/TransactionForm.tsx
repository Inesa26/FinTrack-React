import AddIcon from "@mui/icons-material/Add";
import {
  Alert,
  Box,
  Button,
  Container,
  CssBaseline,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { TransactionType } from "../../interfaces/TransactionType";
import {
  CreateTransactionCommand,
  createTransaction,
} from "../../services/TransactionService";
import YearMonthDayDatePicker from "../DatePicker/YearMonthDayDatePicker";
import CreateCategoryDialog from "../Dialog/CreateCategoryDialog";
import CategoryList from "../List/CategoryList";

const defaultTheme = createTheme({
  palette: {
    error: {
      main: "#ba2222",
    },
  },
});

interface CreateTransactionFormValues {
  transactionType: TransactionType;
  amount: number;
  date: string;
  description: string;
  categoryId: number | null;
}

const TransactionForm: React.FC = () => {
  const [creatingNewCategory, setCreatingNewCategory] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const formik = useFormik<CreateTransactionFormValues>({
    initialValues: {
      transactionType: TransactionType.Expense,
      amount: 0,
      date: "",
      description: "",
      categoryId: null,
    },
    validationSchema: Yup.object({
      transactionType: Yup.string().required("Transaction type is required"),
      amount: Yup.number()
        .positive("Amount must be positive")
        .required("Amount is required"),
      date: Yup.date().required("Date is required"),
      description: Yup.string().max(
        100,
        "Description cannot exceed 100 characters"
      ),
      categoryId: Yup.number().positive().required("Category is required"),
    }),

    onSubmit: async (values) => {
      setSubmitAttempted(true);
      let errorMessage = null;

      if (!values.categoryId) {
        errorMessage = "Please select a category.";
      } else if (!values.date) {
        errorMessage = "Please select a date.";
      }

      if (errorMessage) {
        setErrorMessage(errorMessage);
        return;
      }

      const command: CreateTransactionCommand = {
        transactionType: values.transactionType,
        amount: values.amount,
        date: values.date,
        description: values.description,
        categoryId: values.categoryId!,
      };

      try {
        const response = await createTransaction(command);
        console.log("Transaction created successfully:", response);
        setErrorMessage(null);
        formik.resetForm();
      } catch (error) {
        console.error("Error creating transaction:", error);
        setErrorMessage("Error creating transaction");
      }
    },
  });

  const handleCategorySelection = (categoryId: number) => {
    formik.setFieldValue("categoryId", categoryId);
    setErrorMessage(null);
  };

  const handleCloseDialog = () => {
    setCreatingNewCategory(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              select
              margin="normal"
              required
              fullWidth
              id="transactionType"
              label="Transaction Type"
              name="transactionType"
              value={formik.values.transactionType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                (formik.touched.transactionType || submitAttempted) &&
                Boolean(formik.errors.transactionType)
              }
              helperText={
                (formik.touched.transactionType || submitAttempted) &&
                formik.errors.transactionType
              }
            >
              <MenuItem value={TransactionType.Expense}>Expense</MenuItem>
              <MenuItem value={TransactionType.Income}>Income</MenuItem>
            </TextField>
            <TextField
              margin="normal"
              required
              fullWidth
              id="amount"
              label="Amount"
              name="amount"
              type="number"
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                (formik.touched.amount || submitAttempted) &&
                Boolean(formik.errors.amount)
              }
              helperText={
                (formik.touched.amount || submitAttempted) &&
                formik.errors.amount
              }
            />
            {formik.errors.date && (formik.touched.date || submitAttempted) && (
              <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                Please select a date.
              </Alert>
            )}
            <YearMonthDayDatePicker
              onDateChange={(date) => formik.setFieldValue("date", date)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="description"
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                (formik.touched.description || submitAttempted) &&
                Boolean(formik.errors.description)
              }
              helperText={
                (formik.touched.description || submitAttempted) &&
                formik.errors.description
              }
            />
            <Typography
              component="h2"
              style={{
                marginTop: "10px",
                marginLeft: "15px",
                marginBottom: "3px",
              }}
            >
              Category*
            </Typography>

            {formik.errors.categoryId &&
              (formik.touched.categoryId || submitAttempted) && (
                <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                  Please select a category.
                </Alert>
              )}

            <CategoryList
              onSelectCategory={handleCategorySelection}
              transactionType={formik.values.transactionType}
            />
            <Button
              sx={{ mt: 2 }}
              variant="text"
              color="primary"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => setCreatingNewCategory(true)}
            >
              Couldn't find category?
            </Button>
            {creatingNewCategory && (
              <CreateCategoryDialog onClose={handleCloseDialog} />
            )}
            <Button
              style={{ backgroundColor: "#064aaf" }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Create Transaction
            </Button>
            {errorMessage && (
              <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
                {errorMessage}
              </Alert>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default TransactionForm;
