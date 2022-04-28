import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Grid, TextField } from '@mui/material';

const phoneRegExp = /^\+(?:[0-9] ?){6,14}[0-9]$/;

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  mobile: yup
    .string('Enter your mobile number')
    .matches(phoneRegExp, 'Phone number is not valid (check area code)')
    .required('Mobile is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      mobile: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
      <form className="signup-form" onSubmit={formik.handleSubmit}>
          <h4> Signup Form </h4>
          <Grid container direction={"column"} spacing={2} margin={2}>
            <Grid item>
            <TextField
              id="email"
              name="email"
              label="Email"
              placeholder="email@provider.ext"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            </Grid>
            <Grid item>
              <TextField
              id="mobile"
              name="mobile"
              label="Mobile"
              placeholder="+00123456789"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
            </Grid>
            <Grid item>
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                placeholder="A long password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
          </Grid>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
      </form>
  );
};

export default SignupForm;
