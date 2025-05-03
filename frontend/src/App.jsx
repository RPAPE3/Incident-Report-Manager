import { Routes, Route } from 'react-router-dom'
import Register from './Register'
import ForgotPassword from './ForgotPassword'
import Dashboard from './Dashboard'
import Header from './Header'
import Login from './Login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App
