import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './MainHeader';
import HeaderUser from './user/Header';
import HeaderAdmin from './admin/AdminHeader';

const HeaderRenderer = () => {
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) {
    return <HeaderAdmin />;
  } else if (location.pathname.startsWith('/user')) {
    return <HeaderUser />;
  } else {
    return <Header />;
  }
};

export default HeaderRenderer;
