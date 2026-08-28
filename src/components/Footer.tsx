import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-6 pt-8 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Obolus" className="h-10 w-auto" />
              <span className="text-xl font-bold">Obolus</span>
            </Link>
            <p className="text-gray-500 text-xm">
              This website is purely for educational purposes and is
              not intended for commercial use.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-lg mb-2">Navigation</h3>
            <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
              • Home
            </Link>
            <Link to="/products" className="text-gray-400 hover:text-white transition-colors text-sm">
              • Products
            </Link>
            <Link to="/categories" className="text-gray-400 hover:text-white transition-colors text-sm">
              • Categories
            </Link>
            <Link to="/sell" className="text-gray-400 hover:text-white transition-colors text-sm">
              • Start Selling
            </Link>
          </div>

          {/* Developer */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg mb-1">Developer</h3>
            <p className="text-gray-400 text-sm">Learn more about the developer:</p>
            <a
              href="https://github.com/EmilianoPadilla"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              → GitHub
            </a>
            <a
              href="https://linkedin.com/in/emiliano-padilla-robles"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              → LinkedIn
            </a>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-2 pt-2 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm pt-1">
            © 2025 Obolus. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Developed by Emiliano Padilla
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer