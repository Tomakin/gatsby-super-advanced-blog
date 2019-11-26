import React, { useContext } from 'react';
import styles from './auth.module.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { navigate } from 'gatsby';
import AuthContext from '../../utils/auth_context';

const Auth = () => {
  const context = useContext(AuthContext);

  const uiConfig = {
    credentialHelper: 'none',
    signInFlow: 'popup',
    signInOptions: [
      context.firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      context.firebase.auth.GithubAuthProvider.PROVIDER_ID,
      context.firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      context.firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],

    callbacks: {
      signInSuccessWithAuthResult: function(authResult) {
        saveProfile(authResult);
        return false;
      },
      signInFailure: function(error) {
        console.log(error);
      }
    }
  };

  const sendProfiletoContext = data => {
    context.saveUser(data);
    navigate('/app/profile');
  };

  const saveProfile = authResult => {
    console.log(authResult);
    let provider = authResult.additionalUserInfo.providerId;
    console.log(provider);

    if (provider === 'password') {
      let email = authResult.user.email;
      let username = authResult.user.displayName;
      let id = authResult.user.uid;

      let data = {
        email,
        username,
        id,
        provider
      };

      sendProfiletoContext(data);
    }

    if (provider === 'google.com') {
      let email = authResult.additionalUserInfo.profile.email;
      let username = authResult.additionalUserInfo.profile.name;
      let id = authResult.additionalUserInfo.profile.id;

      let data = {
        email,
        username,
        id,
        provider
      };

      sendProfiletoContext(data);
    }

    if (provider === 'github.com') {
      let email = authResult.additionalUserInfo.profile.email;
      let username = authResult.additionalUserInfo.username;
      let id = authResult.additionalUserInfo.profile.id;

      let data = {
        email,
        username,
        id,
        provider
      };

      sendProfiletoContext(data);
    }

    if (provider === 'facebook.com') {
      let email = authResult.additionalUserInfo.profile.email;
      let username = authResult.additionalUserInfo.name;
      let id = authResult.additionalUserInfo.profile.id;

      let data = {
        email,
        username,
        id,
        provider
      };

      sendProfiletoContext(data);
    }
  };

  return (
    <div className={styles.form_container}>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={context.firebase.auth()} />
    </div>
  );
};

export default Auth;
