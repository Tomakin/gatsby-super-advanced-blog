import React, { useState } from 'react';
import { Formik } from 'formik';
import styles from './authform.module.css';
import axios from 'axios';

const PasswordForgot = () => {
  const [resMessage, setresMessage] = useState(null);
  const [successRes, setsuccessRes] = useState(false);

  const handleSubmit = values => {
    let email = values.emailforgot;

    let data = {
      email
    };

    let handleAuthRes = res => {
      if (res.data) {
        setresMessage(res.data);
        if (res.data === 'Successfully Sent Password reset') {
          setsuccessRes(true);
        }
      } else {
        setresMessage('Request Failed Please Try again');
      }
    };

    let handleAuthErr = err => {
      console.log(err);
      setresMessage('Request Failed Please Try again');
    };

    axios
      .post('http://localhost:3000/forgot', data)
      .then(res => handleAuthRes(res))
      .catch(err => handleAuthErr(err));
  };

  return (
    <div>
      <h3>{resMessage}</h3>
      {!successRes && (
        <>
          <h3> Forgot Password </h3>
          <Formik initialValues={{ emailforgot: '' }} onSubmit={handleSubmit}>
            {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor='emailforgot'>email:</label>
                <input
                  className={styles.form_input}
                  name='emailforgot'
                  id='emailforgot'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.emailforgot}
                />
                <button type='submit' className={styles.form_button} disabled={isSubmitting}>
                  Submit
                </button>
              </form>
            )}
          </Formik>
        </>
      )}
    </div>
  );
};

export default PasswordForgot;
