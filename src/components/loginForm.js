import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { default as secrets } from '../secrets.json';

const minPasswordLength = secrets.min_password_length;

const validationSchema = yup.object({
  login: yup
    .string('Enter your login details')
    .email('Enter a valid login identifier (currently only email supported)')
    .required('Login details are required'),
  password: yup
    .string('Enter your password')
    .min(minPasswordLength, `Password should be of minimum ${minPasswordLength} characters length`)
    .required('Password is required'),
});

const LoginForm = (setParentState) => {
  const formik = useFormik({
    initialValues: {
      login: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        let url = `${secrets.api_details.url}/${secrets.api_details.token_call}`;
        let payload = {...values,
            client_id: secrets.api_details.client_id,
            client_secret: secrets.api_details.client_secret,
            grant_type: 'password',
        };
        axios.post(url, payload).then(res => {
          setParentState(res.data);
        }).catch(error => console.log(error.response));
    }
  });

  return (
      <form className="signup-form" onSubmit={formik.handleSubmit}>
          <h4> Login Form </h4>
          <Grid container direction={"column"} spacing={2} margin={2}>
            <Grid item>
            <TextField
              id="login"
              name="login"
              label="Login (email)"
              placeholder="email@provider.ext"
              value={formik.values.login}
              onChange={formik.handleChange}
              error={formik.touched.login && Boolean(formik.errors.login)}
              helperText={formik.touched.login && formik.errors.login}
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

export default LoginForm;
