import React, { useContext } from 'react';
import Layout from '../components/Layout';
import AuthContext from '../utils/auth_context';

const About = () => {
  const context = useContext(AuthContext);

  return (
    <Layout title="About page">
      <div>
        <div>About Page</div>
        <button onClick={() => console.log(context)}>Button</button>
        <button onClick={() => context.LogOut()}>Button</button>
      </div>
    </Layout>
  );
};

export default About;
