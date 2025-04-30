import Header from './Header';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex items-center justify-center flex-1 p-4">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p>Welcome to IncidentFlow Dashboard</p>
          <p className="text-muted-foreground">This is a placeholder for your dashboard content.</p>
        </div>
      </div>
    </div>
  )
} 