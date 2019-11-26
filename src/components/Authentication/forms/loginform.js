import React, { useState, useContext } from 'react';
import { Formik } from 'formik';
import styles from './authform.module.css';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AuthContext from '../../../utils/auth_context';
import { navigate } from 'gatsby';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [resMessage, setresMessage] = useState(null);
  const context = useContext(AuthContext);

  const handleSubmit = values => {
    setLoading(true);

    let email = values.emaillogin;
    let password = values.passwordlogin;

    let data = {
      email,
      password
    };

    let handleAuthRes = res => {
      console.log(res);
      if (res.data.token) {
        context.saveUser(jwt_decode(res.data.token));
        navigate('/app/profile');
      }
      if (res.data.message) {
        setLoading(false);
        setresMessage(res.data.message);
      }
    };

    let handleAuthErr = err => {
      console.log(err);
      setLoading(false);
      setresMessage('Login Failed Please Try Again');
    };

    axios
      .post('http://localhost:3000/login', data)
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
      <Formik initialValues={{ emaillogin: '', passwordlogin: '' }} onSubmit={handleSubmit}>
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor='emaillogin'>username or email:</label>
            <input
              className={styles.form_input}
              type='email'
              name='emaillogin'
              id='emaillogin'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.emaillogin}
            />
            <label htmlFor='passwordlogin'>password:</label>
            <input
              className={styles.form_input}
              type='password'
              name='passwordlogin'
              id='passwordlogin'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.passwordlogin}
            />
            <button type='submit' className={styles.form_button} disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
