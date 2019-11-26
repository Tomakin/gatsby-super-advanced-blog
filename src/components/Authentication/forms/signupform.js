import React, { useState, useContext } from 'react';
import { Formik } from 'formik';
import styles from './authform.module.css';
import axios from 'axios';
import * as Yup from 'yup';
import jwt_decode from 'jwt-decode';
import AuthContext from '../../../utils/auth_context';
import { navigate } from 'gatsby';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username Too Long')
    .required('Username Required'),
  password: Yup.string()
    .min(8, 'Password Must be 8 characters')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required')
});

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const [resMessage, setresMessage] = useState(null);
  const context = useContext(AuthContext);

  const handleSubmit = values => {
    setLoading(true);

    let email = values.email;
    let password = values.password;
    let username = values.username;

    let data = {
      email,
      username,
      password
    };

    let handleAuthRes = res => {
      if (res.data.token) {
        context.saveUser(jwt_decode(res.data.token));
        navigate('/app/profile');
      }
      if (!res.data.token) {
        setLoading(false);
        setresMessage(res.data);
      }
    };

    let handleAuthErr = err => {
      console.log(err);
      setLoading(false);
      setresMessage('Signup Failed Please Try Again');
    };

    axios
      .post('http://localhost:3000/signup', data)
      .then(res => handleAuthRes(res))
      .catch(err => handleAuthErr(err));
  };

  return (
    <div>
      {loading && (
        <>
          <div className={styles.loader}></div>
          <div className={styles.loading_background}></div>
        </>
      )}
      <h3>{resMessage}</h3>
      <Formik
        initialValues={{ email: '', password: '', username: '' }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor='username'>username:</label>
            <input
              className={styles.form_input}
              name='username'
              id='username'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            {errors.username && touched.username && (
              <span className={styles.error_text}>{errors.username}</span>
            )}
            <label htmlFor='email'>email:</label>
            <input
              className={styles.form_input}
              type='email'
              name='email'
              id='email'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && (
              <span className={styles.error_text}>{errors.email}</span>
            )}
            <label htmlFor='email'>password:</label>
            <input
              className={styles.form_input}
              type='password'
              name='password'
              id='password'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && (
              <span className={styles.error_text}>{errors.password}</span>
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

export default SignUpForm;
