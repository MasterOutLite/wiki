import React, {memo, useState, useCallback, FocusEvent} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Layout from 'src/components/Layout';
import {IS_DEVELOPMENT} from 'src/constants';

import styles from './Login.module.scss';
import authStore from "../../zustand_store/authStore";
import {useNavigate} from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const auth = authStore(state => state.auth);
  const [email, setEmail] = useState(IS_DEVELOPMENT ? 'admin@admin.com' : '');
  const [pass, setPass] = useState(IS_DEVELOPMENT ? '111111' : '');

  const handleEmailChange = useCallback((event: FocusEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setEmail(value);

  }, []);

  const handlePassChange = useCallback((event: FocusEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setPass(value);
  }, []);

  const handleSubmit = useCallback(() => {
    auth(email, pass).then(
      r => {
        navigate('/');
      }
    );
  }, [email, pass, auth, navigate]);

  return (
    <Layout name="Login" className={styles.root}>
      <TextField
        label="Email"
        variant="outlined"
        placeholder="Enter your email"
        fullWidth
        onChange={handleEmailChange}
        type="email"
        value={email}
      />
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        onChange={handlePassChange}
        type="password"
        value={pass}
      />
      <Button style={{background: '#0c7cd5'}} variant="contained" onClick={handleSubmit}>
        Login
      </Button>
    </Layout>
  );
}

export default memo(Login);
