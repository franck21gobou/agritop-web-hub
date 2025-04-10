import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Globe, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Category {
  id: number;
  nom: string;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('FR');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const productsMenuRef = useRef<HTMLDivElement>(null);
  const productsButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (
        productsMenuRef.current && 
        !productsMenuRef.current.contains(event.target as Node) &&
        productsButtonRef.current && 
        !productsButtonRef.current.contains(event.target as Node)
      ) {
        setIsProductsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    // Fetch categories for the dropdown menu
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://agritop.pro/api-agritop.php');
        if (response.data && Array.isArray(response.data.categories)) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
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
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/b92ad846-54c5-4a7a-80b8-a47027827669.png" 
              alt="AGRITOP PRO SARL" 
              className="h-12 md:h-14"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-agritop-green-900 hover:text-agritop-green-600 font-medium transition-colors"
            >
              Accueil
            </Link>
            <a
              href="#about"
              className="text-agritop-green-900 hover:text-agritop-green-600 font-medium transition-colors"
            >
              À propos
            </a>
            <div className="relative">
              <button
                ref={productsButtonRef}
                className="flex items-center text-agritop-green-900 hover:text-agritop-green-600 font-medium transition-colors"
                onClick={() => setIsProductsOpen(!isProductsOpen)}
              >
                Produits
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isProductsOpen && (
                <div 
                  ref={productsMenuRef}
                  className="absolute top-10 -left-4 bg-white shadow-lg rounded-md py-2 w-48 animate-fade-in z-50"
                >
                  {loading ? (
                    <div className="px-4 py-2 text-agritop-green-900 flex items-center">
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Chargement...
                    </div>
                  ) : (
                    categories.map(category => (
                      <Link
                        key={category.id}
                        to={`/category/${category.id}`}
                        className="block px-4 py-2 hover:bg-agritop-green-50 text-agritop-green-900"
                        onClick={() => setIsProductsOpen(false)}
                      >
                        {category.nom}
                      </Link>
                    ))
                  )}
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

          <div className="hidden md:block">
            <Link to="/contact" className="button-primary">
              Demande de devis
            </Link>
          </div>

          <button
            className="md:hidden text-agritop-green-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 animate-fade-in">
            <Link
              to="/"
              className="block py-2 text-agritop-green-900 hover:text-agritop-green-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <a
              href="#about"
              className="block py-2 text-agritop-green-900 hover:text-agritop-green-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
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
                {loading ? (
                  <div className="py-2 text-agritop-green-900 flex items-center">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Chargement...
                  </div>
                ) : (
                  categories.map(category => (
                    <Link
                      key={category.id}
                      to={`/category/${category.id}`}
                      className="block py-2 text-agritop-green-900 hover:text-agritop-green-600"
                      onClick={() => {
                        setIsProductsOpen(false);
                        setIsMenuOpen(false);
                      }}
                    >
                      {category.nom}
                    </Link>
                  ))
                )}
              </div>
            )}
            <a
              href="#contact"
              className="block py-2 text-agritop-green-900 hover:text-agritop-green-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
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
              <Link 
                to="/contact" 
                className="button-primary text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Demande de devis
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
