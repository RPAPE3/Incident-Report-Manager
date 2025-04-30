import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="border-b px-4 py-3">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <span role="img" aria-label="shield" className="text-primary">🛡️</span>
          <span>IncidentFlow</span>
        </div>
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
} 