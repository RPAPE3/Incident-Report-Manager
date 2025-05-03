import { useState } from "react";
import Header from './components/ui/Header';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Reset your password</h1>
            <p className="text-gray-500">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send reset link"}
              </button>
              <div className="text-center">
                <a href="/" className="inline-flex items-center text-sm text-blue-600 hover:underline">
                  <span className="mr-1">←</span>
                  Back to login
                </a>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg border p-4 text-center">
                <p className="mb-2">Check your email</p>
                <p className="text-sm text-gray-500">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
              </div>
              <div className="text-center">
                <a href="/" className="inline-flex items-center text-sm text-blue-600 hover:underline">
                  <span className="mr-1">←</span>
                  Back to login
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="border-t py-4 text-center text-sm text-gray-500">
        <div className="container">&copy; {new Date().getFullYear()} IncidentFlow. All rights reserved.</div>
      </footer>
    </div>
  );
}

export default ForgotPassword; 