
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('FR');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'FR' ? 'EN' : 'FR');
  };

  return (
    <header
      className={cn(
        'fixed w-full z-50 transition-all duration-300 backdrop-blur-md',
        isScrolled
          ? 'bg-white/90 shadow-md py-2'
          : 'bg-transparent py-4'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <div className="font-serif font-bold text-2xl text-agritop-green-700">
              AGRITOP<span className="text-agritop-sun-600">PRO</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-agritop-green-900 hover:text-agritop-green-600 font-medium transition-colors"
            >
              Accueil
            </a>
            <a
              href="#about"
              className="text-agritop-green-900 hover:text-agritop-green-600 font-medium transition-colors"
            >
              À propos
            </a>
            <div className="relative">
              <button
                className="flex items-center text-agritop-green-900 hover:text-agritop-green-600 font-medium transition-colors"
                onClick={() => setIsProductsOpen(!isProductsOpen)}
              >
                Produits
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isProductsOpen && (
                <div className="absolute top-10 -left-4 bg-white shadow-lg rounded-md py-2 w-48 animate-fade-in">
                  <a
                    href="#cereals"
                    className="block px-4 py-2 hover:bg-agritop-green-50 text-agritop-green-900"
                  >
                    Céréales
                  </a>
                  <a
                    href="#fruits"
                    className="block px-4 py-2 hover:bg-agritop-green-50 text-agritop-green-900"
                  >
                    Fruits
                  </a>
                  <a
                    href="#nuts"
                    className="block px-4 py-2 hover:bg-agritop-green-50 text-agritop-green-900"
                  >
                    Noix
                  </a>
                  <a
                    href="#legumes"
                    className="block px-4 py-2 hover:bg-agritop-green-50 text-agritop-green-900"
                  >
                    Légumineuses
                  </a>
                </div>
              )}
            </div>
            <a
              href="#contact"
              className="text-agritop-green-900 hover:text-agritop-green-600 font-medium transition-colors"
            >
              Contact
            </a>
            <button
              onClick={toggleLanguage}
              className="flex items-center text-agritop-green-900 hover:text-agritop-green-600 font-medium transition-colors"
            >
              <Globe className="mr-1 h-4 w-4" />
              {currentLanguage}
            </button>
          </nav>

          {/* Language switcher for desktop */}
          <div className="hidden md:block">
            <a href="#contact" className="button-primary">
              Demande de devis
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-agritop-green-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 animate-fade-in">
            <a
              href="/"
              className="block py-2 text-agritop-green-900 hover:text-agritop-green-600 font-medium"
            >
              Accueil
            </a>
            <a
              href="#about"
              className="block py-2 text-agritop-green-900 hover:text-agritop-green-600 font-medium"
            >
              À propos
            </a>
            <button
              className="flex items-center w-full py-2 text-agritop-green-900 hover:text-agritop-green-600 font-medium"
              onClick={() => setIsProductsOpen(!isProductsOpen)}
            >
              Produits
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {isProductsOpen && (
              <div className="pl-4 mt-1 border-l-2 border-agritop-green-100">
                <a
                  href="#cereals"
                  className="block py-2 text-agritop-green-900 hover:text-agritop-green-600"
                >
                  Céréales
                </a>
                <a
                  href="#fruits"
                  className="block py-2 text-agritop-green-900 hover:text-agritop-green-600"
                >
                  Fruits
                </a>
                <a
                  href="#nuts"
                  className="block py-2 text-agritop-green-900 hover:text-agritop-green-600"
                >
                  Noix
                </a>
                <a
                  href="#legumes"
                  className="block py-2 text-agritop-green-900 hover:text-agritop-green-600"
                >
                  Légumineuses
                </a>
              </div>
            )}
            <a
              href="#contact"
              className="block py-2 text-agritop-green-900 hover:text-agritop-green-600 font-medium"
            >
              Contact
            </a>
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={toggleLanguage}
                className="flex items-center text-agritop-green-900 hover:text-agritop-green-600 font-medium"
              >
                <Globe className="mr-1 h-4 w-4" />
                {currentLanguage}
              </button>
              <a href="#contact" className="button-primary text-sm">
                Demande de devis
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
