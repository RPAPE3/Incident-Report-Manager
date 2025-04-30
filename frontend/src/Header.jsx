import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header className="border-b px-4 py-3">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <span role="img" aria-label="shield" className="text-primary">🛡️</span>
          <span>IncidentFlow</span>
        </div>
        {isLoggedIn && (
          <div className="relative flex items-center gap-4" ref={dropdownRef}>
            <button
              className="rounded-full p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setDropdownOpen((open) => !open)}
              aria-label="User menu"
            >
              <FontAwesomeIcon icon={faUser} className="h-5 w-5 text-gray-700" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-32 w-36 bg-white border rounded shadow-lg z-50">
                <button className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faRightFromBracket} className="mr-2 h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
} 