import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Button, IconButton, Checkbox, FormControlLabel,
  Grid, TextField, Snackbar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import axios from 'axios';
import { default as secrets } from '../secrets.json';

const minPasswordLength = secrets.min_password_length;
const phoneRegExp = /^[0-9]{10}$/;

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  mobile: yup
    .string('Enter your mobile number')
    .matches(phoneRegExp, 'Phone number is not valid (requires exactly ten digits)')
    .required('Mobile is required'),
  password: yup
    .string('Enter your password')
    .min(minPasswordLength, `Password should be of minimum ${minPasswordLength} characters length`)
    .required('Password is required'),
  first_name: yup
    .string('Enter your first name'),
  surname: yup
    .string('Enter your surname'),
  accepted_tac: yup
    .boolean('Accept the terms and conditions')
    .required(`The T's and C's must be accepted to continue`)
    .oneOf([true], `The T's and C's must be accepted to continue`),
});

const SignupForm = () => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarVisible(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackbarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      mobile: '',
      first_name: '',
      surname: '',
      accepted_tac: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let url = `${secrets.api_details.url}/${secrets.api_details.profile_api_call}`;
      let payload = { "profile": values };
      axios.post(url, payload).then(res => {
        console.log(res);
        setSnackbarVisible(true);
      }).catch(error => console.log(error.response));
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
            <Grid item>
              <FormControlLabel
                control={<Checkbox checked={formik.values.accepted_tac} />}
                id="accepted_tac"
                name="accepted_tac"
                label="Accept Terms and Conditions"
                onChange={formik.handleChange}
                error={formik.touched.accepted_tac && Boolean(formik.errors.accepted_tac)}
                helperText={formik.touched.accepted_tac && formik.errors.accepted_tac}
              />
            </Grid>
          </Grid>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
          <Snackbar
            open={snackbarVisible}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message="Successfully Registered"
            action={action}
          />
      </form>
  );
};

export default SignupForm;
