import React, { useState, useContext } from 'react';
import styles from './auth.module.css';
import axios from 'axios';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { navigate } from 'gatsby';
import LoginForm from './forms/loginform';
import SignUpForm from './forms/signupform';
import jwt_decode from 'jwt-decode';
import AuthContext from '../../utils/auth_context';
import PasswordForgot from './forms/password_forgot';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [resMessage, setresMessage] = useState(null);
  const [isSignIn, setSignIn] = useState(true);
  const [forgot, setForgot] = useState(false);
  const context = useContext(AuthContext);

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      context.firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      context.firebase.auth.GithubAuthProvider.PROVIDER_ID,
      context.firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: function(authResult) {
        console.log(authResult);
        saveProfile(authResult);
        return false;
      },
      signInFailure: function(error) {
        console.log(error);
        setresMessage('Signin Failed');
      }
    }
  };

  const handleAuthres = res => {
    if (res.data.token) {
      context.saveUser(jwt_decode(res.data.token));
      navigate('/app/profile');
    }
    if (!res.data.token) {
      setresMessage('Signup Failed Please Try Again');
    }
  };

  const handleAuthErr = err => {
    console.log(err);
    setLoading(false);
    setresMessage('Signup Failed Please Try Again');
  };

  const sendProfiletoDB = data => {
    setLoading(true);
    axios
      .post('http://localhost:3000/autho2signup', data)
      .then(res => handleAuthres(res))
      .catch(err => handleAuthErr(err));
  };

  const saveProfile = authResult => {
    setLoading(true);
    let provider = authResult.additionalUserInfo.providerId;

    if (provider === 'google.com') {
      //the user will not sign in with this password
      //it is only a placeholder password for the db
      let email = authResult.additionalUserInfo.profile.email;
      let username = authResult.additionalUserInfo.profile.name;
      let password = authResult.additionalUserInfo.profile.id;

      let data = {
        email,
        username,
        password,
        provider
      };

      sendProfiletoDB(data);
    }

    if (provider === 'github.com') {
      let email = authResult.additionalUserInfo.profile.email;
      let username = authResult.additionalUserInfo.username;
      let password = authResult.additionalUserInfo.profile.id;

      let data = {
        email,
        username,
        password,
        provider
      };

      sendProfiletoDB(data);
    }

    if (provider === 'facebook.com') {
      let email = authResult.additionalUserInfo.profile.email;
      let username = authResult.additionalUserInfo.name;
      let password = authResult.additionalUserInfo.profile.id;

      let data = {
        email,
        username,
        password,
        provider
      };

      sendProfiletoDB(data);
    }
  };

  return (
    <div className={styles.form_container}>
      {loading && (
        <>
          <div className={styles.loader}></div>
          <div className={styles.loading_background}></div>
        </>
      )}
      <h3>{resMessage}</h3>
      {!forgot && context.firebase && (
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={context.firebase.auth()} />
      )}
      {isSignIn && !forgot && (
        <>
          <LoginForm />
          <div>
            Dont have an Account? &nbsp;
            <button onClick={() => setSignIn(false)}>SignUp</button>
          </div>
          <small onClick={() => setForgot(true)} className={styles.forgot_password}>
            Forgot Password?
          </small>
        </>
      )}
      {!isSignIn && !forgot && (
        <>
          <SignUpForm />
          <div>
            Already have an Account? &nbsp;
            <button onClick={() => setSignIn(true)}>Login</button>
          </div>
        </>
      )}
      {forgot && (
        <>
          <PasswordForgot />
          <small onClick={() => setForgot(false)} className={styles.forgot_password}>
            Back to login
          </small>
        </>
      )}
    </div>
  );
};

export default Auth;
