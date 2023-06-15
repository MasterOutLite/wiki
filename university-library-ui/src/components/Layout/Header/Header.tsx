import React, {memo, useCallback, useState} from 'react';

import logo from 'src/assets/logo.svg';
import styles from './Header.module.scss';
import {AppBar, Box, Button, CssBaseline, IconButton, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

export interface HeaderProps {
  name: string;
}

function Header({name}: HeaderProps) {
  const navigate = useNavigate();
  const [navItems] = useState(
    [
      {id: 1, title: 'Home', link: '/'},
      {id: 2, title: 'Articles', link: '/articles'},
      {id: 3, title: 'Login', link: '/login'},
    ]
  );

  const goTo = useCallback((link: string) => {
    navigate(link);
  }, [navigate]);

  return (
    <Box sx={{display: 'flex', height: '64px',}}>
      <AppBar component="nav" style={{background: '#0c7cd5'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"

            sx={{mr: 2, display: {sm: 'none'}}}
          >

          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
          >
            Wiki
          </Typography>
          <Box sx={{display: {xs: 'none', sm: 'block'}}}>
            {navItems.map((item) => (
              <Button key={item.id} sx={{color: '#fff'}} onClick={() => {
                goTo(item.link);
              }}>
                {item.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default memo(Header);
