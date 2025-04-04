import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, User } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-safebite-dark-blue/90 backdrop-blur-md border-b border-safebite-card-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold gradient-text">SafeBite</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-safebite-text hover:text-safebite-teal transition-colors">Home</Link>
            <Link to="/features" className="text-safebite-text hover:text-safebite-teal transition-colors">Features</Link>
            <Link to="/about" className="text-safebite-text hover:text-safebite-teal transition-colors">About</Link>
            <Button
              variant="outline"
              className="sci-fi-button"
              onClick={() => navigate('/auth/login')}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
            <Button
              className="bg-safebite-teal text-safebite-dark-blue hover:bg-safebite-teal/80"
              onClick={() => navigate('/auth/signup')}
            >
              <User className="mr-2 h-4 w-4" />
              Sign Up
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-safebite-text hover:text-safebite-teal focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-safebite-card-bg border-b border-safebite-card-bg-alt">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-safebite-text hover:bg-safebite-card-bg-alt hover:text-safebite-teal"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/features"
              className="block px-3 py-2 rounded-md text-safebite-text hover:bg-safebite-card-bg-alt hover:text-safebite-teal"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-safebite-text hover:bg-safebite-card-bg-alt hover:text-safebite-teal"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>

            <div className="flex flex-col space-y-2 pt-2">
              <Button
                variant="outline"
                className="sci-fi-button w-full justify-center"
                onClick={() => {
                  navigate('/auth/login');
                  setIsMenuOpen(false);
                }}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
              <Button
                className="bg-safebite-teal text-safebite-dark-blue hover:bg-safebite-teal/80 w-full justify-center"
                onClick={() => {
                  navigate('/auth/signup');
                  setIsMenuOpen(false);
                }}
              >
                <User className="mr-2 h-4 w-4" />
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
