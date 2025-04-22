import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Dashboard } from './pages/Dashboard'
import Calendar from './pages/Calendar'
import Notes from './pages/Notes'


// Pages
const Statistics = () => <div>Mood Statistics</div>

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile menu button */}
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-lg shadow-md"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 z-40 h-screen w-64 transform transition-transform duration-300 ease-in-out 
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            md:translate-x-0 bg-white shadow-lg`}
        >
          <div className="px-6 py-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-8">Mood Weather</h1>
            <nav className="space-y-4">
              <Link
                to="/"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-purple-50 hover:text-purple-600"
              >
                Dashboard
              </Link>
              <Link
                to="/calendar"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-purple-50 hover:text-purple-600"
              >
                Calendar
              </Link>
              <Link
                to="/statistics"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-purple-50 hover:text-purple-600"
              >
                Statistics
              </Link>
              <Link
                to="/notes"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-purple-50 hover:text-purple-600"
              >
                Notes
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'md:ml-64' : 'md:ml-64'} p-8`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/notes" element={<Notes />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
