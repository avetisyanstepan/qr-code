import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { NotFoundPage } from './components/404';
import { QrCode } from './components/CreateQrCode';
import { ForgotPassword } from './components/ForgotPassword';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { userIsAuthenticated } from './hooks';

function App() {
  const isAuth = userIsAuthenticated()
  return (
      <Routes>
        <Route path="/" element={<QrCode />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFoundPage />} />

      </Routes>  

  );
}

export default App;
