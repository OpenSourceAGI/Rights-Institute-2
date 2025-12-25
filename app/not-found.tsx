export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-slate-300 mb-4">Could not find the requested resource</p>
        <a
          href="/"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors inline-block"
        >
          Return Home
        </a>
      </div>
    </div>
  )
} 