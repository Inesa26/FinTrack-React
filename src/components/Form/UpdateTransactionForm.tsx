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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { TransactionType } from "../../interfaces/TransactionType";
import {
  UpdateTransactionCommand,
  getTransactionById,
  updateTransaction,
} from "../../services/TransactionService";
import CreateCategoryDialog from "../Dialog/CreateCategoryDialog";
import CategoryList from "../List/CategoryList";

const defaultTheme = createTheme({
  palette: {
    error: {
      main: "#ba2222",
    },
  },
});

interface UpdateTransactionFormValues {
  transactionType: TransactionType;
  amount: number;
  date: Dayjs | null;
  description: string;
  categoryId: number | 0;
}

interface UpdateTransactionFormProps {
  transactionId: number;
}

const UpdateTransactionForm: React.FC<UpdateTransactionFormProps> = ({
  transactionId,
}) => {
  const [creatingNewCategory, setCreatingNewCategory] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [initialCategoryId, setInitialCategoryId] = useState<number | 0>(0); // State to hold initial categoryId

  const formik = useFormik<UpdateTransactionFormValues>({
    initialValues: {
      transactionType: TransactionType.Expense,
      amount: 0,
      date: null,
      description: "",
      categoryId: 0,
    },
    validationSchema: Yup.object({
      transactionType: Yup.string().required("Transaction type is required"),
      amount: Yup.number()
        .positive("Amount must be positive")
        .required("Amount is required"),
      date: Yup.date().required("Date is required").nullable(),
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

      const command: UpdateTransactionCommand = {
        transactionId: transactionId,
        transactionType: values.transactionType,
        amount: values.amount,
        date: values.date ? values.date.toISOString() : "",
        description: values.description,
        categoryId: values.categoryId,
      };

      try {
        const response = await updateTransaction(command);
        console.log("Transaction updated successfully:", response);
        setErrorMessage(null);
        formik.resetForm();
      } catch (error) {
        console.error("Error updating transaction:", error);
        setErrorMessage("Error updating transaction");
      }
    },
  });

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const transaction = await getTransactionById(transactionId);
        console.log(transaction);
        formik.setValues({
          transactionType: transaction.transactionType,
          amount: transaction.amount,
          date: dayjs(transaction.date),
          description: transaction.description,
          categoryId: transaction.categoryId,
        });
        setInitialCategoryId(transaction.categoryId); // Set initial categoryId state
      } catch (error) {
        console.error("Error fetching transaction:", error);
        setErrorMessage("Error fetching transaction");
      }
    };

    fetchTransaction();
  }, [transactionId]);

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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                value={formik.values.date}
                onChange={(newValue) => {
                  formik.setFieldValue("date", newValue);
                }}
              />
            </LocalizationProvider>
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
              initialSelectedCategory={initialCategoryId}
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
              style={{ backgroundColor: "green" }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Update Transaction
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

export default UpdateTransactionForm;
