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
  first_name: yup
    .string('Enter your first name'),
  surname: yup
    .string('Enter your surname'),
});

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      mobile: '',
      first_name: '',
      surname: '',
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
            <Grid item>
              <TextField
                id="first_name"
                name="first_name"
                label="First Name"
                placeholder="Hugh"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                helperText={formik.touched.first_name && formik.errors.first_name}
              />
            </Grid>
            <Grid item>
              <TextField
                id="surname"
                name="surname"
                label="Surname"
                placeholder="Mann"
                value={formik.values.surname}
                onChange={formik.handleChange}
                error={formik.touched.surname && Boolean(formik.errors.surname)}
                helperText={formik.touched.surname && formik.errors.surname}
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
