import { useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Register from './Register'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (username === "demo" && password === "password") {
        window.location.href = "/dashboard";
      } else {
        setError("Invalid credentials. Try demo/password for this demo.");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b px-4 py-3">
        <div className="container flex items-center">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <span role="img" aria-label="shield" className="text-primary">🛡️</span>
            <span>IncidentFlow</span>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-gray-500">Enter your credentials to access your account</p>
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium">Username</label>
              <input
                id="username"
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium">Password</label>
                <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
              </div>
              <input
                id="password"
                type="password"
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline">Create an account</Link>
            </p>
          </div>
        </div>
      </main>
      <footer className="border-t py-4 text-center text-sm text-gray-500">
        <div className="container">&copy; {new Date().getFullYear()} IncidentFlow. All rights reserved.</div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App
