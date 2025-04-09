
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../ui/ProductCard';
import CategoryCard from '../ui/CategoryCard';
import { Wheat, Apple, Nut, LeafyGreen, Loader2 } from 'lucide-react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  description: string;
  origin: string;
  imageUrl: string;
  category: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
}

const ProductsSection = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Record<number, Product[]>>({});
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://agritop.pro/api-agritop.php');
        
        if (response.data) {
          // Process categories
          if (Array.isArray(response.data.categories)) {
            const mappedCategories = response.data.categories.map((cat: any) => ({
              id: cat.id,
              name: cat.nom,
              description: cat.description || "Produits de qualité",
              icon: getCategoryIcon(cat.nom)
            }));
            
            setCategories(mappedCategories);
            
            if (mappedCategories.length > 0) {
              setActiveCategory(mappedCategories[0].id);
            }
            
            // Process products by category
            const productsByCategory: Record<number, Product[]> = {};
            
            if (Array.isArray(response.data.produits)) {
              response.data.produits.forEach((product: any) => {
                const categoryId = parseInt(product.categorie_id);
                const category = response.data.categories.find((c: any) => c.id === categoryId);
                
                const formattedProduct = {
                  id: product.id,
                  name: product.nom,
                  description: product.description || "Description non disponible",
                  origin: product.origine || "Côte d'Ivoire",
                  imageUrl: product.image || "/placeholder.svg",
                  category: category ? category.nom : "Divers"
                };
                
                if (!productsByCategory[categoryId]) {
                  productsByCategory[categoryId] = [];
                }
                
                productsByCategory[categoryId].push(formattedProduct);
              });
            }
            
            setProducts(productsByCategory);
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Get appropriate icon based on category name
  const getCategoryIcon = (categoryName: string): string => {
    const name = categoryName.toLowerCase();
    if (name.includes('céréale') || name.includes('cereale')) return 'Wheat';
    if (name.includes('fruit')) return 'Apple';
    if (name.includes('noix') || name.includes('oléagineux') || name.includes('oleagineux')) return 'Nut';
    if (name.includes('légume') || name.includes('legume') || name.includes('légumineuse') || name.includes('legumineuse')) return 'LeafyGreen';
    return 'Wheat';
  };
  
  // Render the appropriate icon based on the category
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wheat':
        return <Wheat className="h-6 w-6 text-agritop-green-600" />;
      case 'Apple':
        return <Apple className="h-6 w-6 text-agritop-green-600" />;
      case 'Nut':
        return <Nut className="h-6 w-6 text-agritop-green-600" />;
      case 'LeafyGreen':
        return <LeafyGreen className="h-6 w-6 text-agritop-green-600" />;
      default:
        return <Wheat className="h-6 w-6 text-agritop-green-600" />;
    }
  };

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };
  
  const handleCategoryClick = (categoryId: number) => {
    setActiveCategory(categoryId);
  };
  
  const handleViewAllInCategory = (categoryId: number) => {
    navigate(`/category/${categoryId}`);
  };
  
  if (loading) {
    return (
      <section id="products" className="py-20 bg-agritop-green-50">
        <div className="section-container text-center">
          <h2 className="section-title">Nos produits agricoles</h2>
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-agritop-green-600" />
          </div>
        </div>
      </section>
    );
  }
  
  if (error) {
    return (
      <section id="products" className="py-20 bg-agritop-green-50">
        <div className="section-container">
          <h2 className="section-title">Nos produits agricoles</h2>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-3xl mx-auto">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }
  
  const activeProducts = activeCategory !== null ? products[activeCategory] || [] : [];

  return (
    <section id="products" className="py-20 bg-agritop-green-50">
      <div className="section-container">
        <h2 className="section-title">Nos produits agricoles</h2>
        
        <p className="text-agritop-earth-800 text-center max-w-3xl mx-auto mb-12">
          Découvrez notre gamme complète de produits agricoles de haute qualité en provenance de Côte d'Ivoire et d'autres pays d'Afrique de l'Ouest. Nous proposons des volumes importants pour répondre aux besoins des industries et des marchés internationaux.
        </p>
        
        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => (
            <div key={category.id} onClick={() => handleCategoryClick(category.id)}>
              <CategoryCard
                name={category.name}
                description={category.description}
                icon={renderIcon(category.icon)}
                active={activeCategory === category.id}
                onClick={() => {}}
              />
            </div>
          ))}
        </div>
        
        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {activeProducts.slice(0, 4).map((product) => (
            <div key={product.id} className="cursor-pointer" onClick={() => handleProductClick(product.id)}>
              <ProductCard
                name={product.name}
                description={product.description}
                origin={product.origin}
                imageUrl={product.imageUrl}
                category={product.category}
              />
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="text-center mt-16">
          {activeCategory !== null && (
            <button
              onClick={() => handleViewAllInCategory(activeCategory)}
              className="button-primary inline-flex items-center"
            >
              Voir tous les produits de cette catégorie
            </button>
          )}
          <p className="text-agritop-earth-700 mt-4 text-sm">
            Contactez-nous pour des informations détaillées sur nos produits, y compris les spécifications techniques, les capacités d'approvisionnement et les tarifs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
