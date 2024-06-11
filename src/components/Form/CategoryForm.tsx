import React, { useState } from 'react';
import { TextField, Button, MenuItem, Box, Typography, Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CreateCategoryCommand, createCategory } from '../../services/CategoryService';
import IconList from '../List/IconList'; 
import { TransactionType } from '../../interfaces/TransactionType';

const defaultTheme = createTheme({
    palette: {
      error: {
        main: "#ba2222",
      },
    },
  });

interface CreateCategoryFormValues {
    title: string;
    type: TransactionType;
  }
  
  const CategoryForm: React.FC = () => {
    const [selectedIconId, setSelectedIconId] = useState<number | null>(null);
  
    const formik = useFormik<CreateCategoryFormValues>({
      initialValues: {
        title: '',
        type: TransactionType.Expense,
      },
      validationSchema: Yup.object({
        title: Yup.string().max(20, 'Title cannot exceed 20 characters').required('Title is required'),
        type: Yup.mixed<TransactionType>().oneOf(Object.values(TransactionType) as TransactionType[]).required('Type is required'),
      }),
      onSubmit: async (values) => {
        if (selectedIconId === null) {
          alert('Please select an icon.');
          return;
        }
  
        const command: CreateCategoryCommand = {
          title: values.title,
          iconId: selectedIconId,
          type: values.type, 
        };
  
        try {
          const response = await createCategory(command);
          console.log('Category created successfully:', response);
        } catch (error) {
          console.error('Error creating category:', error);
        }
      },
    });
  
    const handleIconSelection = (iconId: number) => {
      setSelectedIconId(iconId);
    };
  
    return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs"
     >
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">Create Category</Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              select
              margin="normal"
              required
              fullWidth
              id="type"
              label="Type"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.type && Boolean(formik.errors.type)}
              helperText={formik.touched.type && formik.errors.type}
            >
              <MenuItem value={TransactionType.Income}>Income</MenuItem>
              <MenuItem value={TransactionType.Expense}>Expense</MenuItem>
            </TextField>
            <Typography 
             style={{ 
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
             }}
            component="h2" variant="h6">Select an Icon</Typography>
            <IconList 
            onSelectIcon={handleIconSelection} transactionType={formik.values.type}/>
            <Button
              style={{ backgroundColor: "#064aaf"}}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Category
            </Button>
          </Box>
        </Box>
      </Container>
      </ThemeProvider>
    );
  };
  
  export default CategoryForm; 