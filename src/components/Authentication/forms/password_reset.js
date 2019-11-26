import React, { useState } from 'react';
import { Formik } from 'formik';
import styles from './authform.module.css';
import axios from 'axios';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  passwordreset: Yup.string()
    .min(8, 'Password Must be 8 characters')
    .required('Required'),
  passwordconfirm: Yup.string().oneOf([Yup.ref('passwordreset')], 'Passwords do not match')
});

const PasswordReset = props => {
  const [resMessage, setresMessage] = useState(null);

  const handleSubmit = values => {
    let email = values.emailreset;
    let password = values.passwordreset;
    let token = props.location.pathname.substring(19);

    let data = {
      email,
      password,
      token
    };

    let handleAuthRes = res => {
      if (res.data) {
        setresMessage(res.data);
      } else {
        setresMessage('Reset Failed Please Try again');
      }
    };

    let handleAuthErr = err => {
      console.log(err);
      setresMessage('Reset Failed Please Try again');
    };

    axios
      .post('http://localhost:3000/password_reset', data)
      .then(res => handleAuthRes(res))
      .catch(err => handleAuthErr(err));
  };

  return (
    <div>
      <h3> Resetting Password: </h3>
      <h4>{resMessage}</h4>
      <Formik
        initialValues={{ emailreset: '', passwordreset: '', passwordconfirm: '' }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor='emailreset'>email:</label>
            <input
              className={styles.form_input}
              type='email'
              name='emailreset'
              id='emailreset'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.emailreset}
            />
            <label htmlFor='passwordreset'>new password:</label>
            <input
              className={styles.form_input}
              type='password'
              name='passwordreset'
              id='passwordreset'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.passwordreset}
            />
            {errors.passwordreset && touched.passwordreset && (
              <span className={styles.error_text}>{errors.passwordreset}</span>
            )}
            <label htmlFor='passwordconfirm'>confirm password:</label>
            <input
              className={styles.form_input}
              type='password'
              name='passwordconfirm'
              id='passwordconfirm'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.passwordconfirm}
            />
            {errors.passwordconfirm && touched.passwordconfirm && (
              <span className={styles.error_text}>{errors.passwordconfirm}</span>
            )}
            <button type='submit' className={styles.form_button} disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default PasswordReset;
