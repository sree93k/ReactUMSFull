import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/user/home';
import SignIn from './pages/user/signin';
import SignUp from './pages/user/signup';
import Edit from './pages/user/edit';
import MainPage from './pages/mainPage';
import AdminSignIn from './pages/admin/adminSignin';
import AdminHome from './pages/admin/adminHome';
import AdminEdit from './pages/admin/adminEdit';
import AdminDashboard from './pages/admin/adminDashboard';
import HeaderRenderer from './components/HeaderRender';
import EditProfile from './pages/user/edit'
import ResetPassowrd from './pages/user/passwordEdit'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <HeaderRenderer />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/user/signin" element={<SignIn />} />
          <Route path="/user/signup" element={<SignUp />} />
          <Route path="/user/home" element={<Home />} />
          <Route path="/user/edit" element={<Edit />} />
          <Route path="/user/editProfile" element={<EditProfile />} />
          <Route path="/user/resetPassword" element={<ResetPassowrd />} />
          <Route path="/admin/signin" element={<AdminSignIn />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/edit" element={<AdminEdit />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
