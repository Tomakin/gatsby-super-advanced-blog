import React, { useState, useContext } from 'react';
import styles from './header.module.css';
import img from '../../../static/logos/favicon.ico';
import { Link } from 'gatsby';
import Search from '../Search';
import AuthContext from '../../utils/auth_context';
import { navigate } from 'gatsby';

const Header = () => {
  const [menu, toggleMenu] = useState(false);
  const context = useContext(AuthContext);

  const menuHandler = () => {
    if (menu) {
      toggleMenu(false);
    } else {
      toggleMenu(true);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.left_header}>
        <Link to="/">
          <img src={img} alt="" />
        </Link>
      </div>

      <div className={styles.mid_header}>
        <Link
          to="/about"
          className={styles.header_link}
          activeClassName={styles.header_link_active}
        >
          About
        </Link>
        <Link
          to="/contact"
          className={styles.header_link}
          activeClassName={styles.header_link_active}
        >
          Contact
        </Link>
        <Link to="/blog" className={styles.header_link} activeClassName={styles.header_link_active}>
          Blog
        </Link>
      </div>

      <div className={styles.right_header}>
        <div className={styles.searchbox}>
          <Search />
        </div>
        {!context.state.isAuthenticated && (
          <Link
            to="/app/login"
            className={styles.login_button}
            activeClassName={styles.login_button_active}
          >
            Login
          </Link>
        )}
        {context.state.isAuthenticated && (
          <div className={styles.drop_down_wrapper}>
            <i onClick={menuHandler} className="material-icons">
              account_circle
            </i>
            {/* <button>Button1</button> */}
            {menu && (
              <div className={styles.drop_down}>
                <div onClick={() => navigate('/app/profile')} className={styles.drop_down_link}>
                  Profile
                </div>
                <div
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => context.LogOut(), 400);
                  }}
                  className={styles.drop_down_link}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
