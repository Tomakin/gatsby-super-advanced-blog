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
    let email = authResult.user.email;
    let username = authResult.user.displayName;
    let id = authResult.user.uid;
    let photo = authResult.user.photoURL;

    let data = {
      email,
      username,
      id,
      provider,
      photo
    };

    sendProfiletoContext(data);
  };

  return (
    <div className={styles.form_container}>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={context.firebase.auth()} />
    </div>
  );
};

export default Auth;
