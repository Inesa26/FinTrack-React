import { Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';

const defaultTheme = createTheme({
  palette: {
    error: {
      main: "#ba2222",
    },
  },
});

interface LogInFormValues {
  email: string;
  password: string;
  server?: string; 
}

export default function LogIn() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik<LogInFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one digit')
        .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
        .required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await login({
          email: values.email,
          password: values.password,
        });
        console.log('User logged successfully:', response.token);
        navigate('/afterLogin');  
      } catch (error) {
        console.error('Login error:', error);
        setErrors({ server: 'Login failed. Please try again.' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              style={{ backgroundColor: "#064aaf", textTransform: "none" }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 3 }}
            >
              Log In
            </Button>
            {formik.errors.server && (
              <Typography color="error" variant="body2">
                {formik.errors.server}
              </Typography>
            )}
            <Grid item style={{ textAlign: 'center' }}>
              <Link onClick={() => navigate('/signup')} href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
