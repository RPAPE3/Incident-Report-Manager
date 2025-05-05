export default function ToastNotification({ show, message }) {
  if (!show) return null;
  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-red-600 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out">
      {message}
    </div>
  );
} 