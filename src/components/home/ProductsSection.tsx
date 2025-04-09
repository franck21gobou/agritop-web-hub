
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../ui/ProductCard';
import CategoryCard from '../ui/CategoryCard';
import { Wheat, Apple, Nut, LeafyGreen } from 'lucide-react';
import { productCategories } from '@/data/products';
import axios from 'axios';

interface ProductData {
  id: number;
  name: string;
  description: string;
  origin: string;
  imageUrl: string;
  category: string;
}

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState(productCategories[0].id);
  const navigate = useNavigate();
  
  // Fetch products from API
  const { data: apiProducts, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        const response = await axios.get('https://agritop.pro/api-agritop.php');
        
        if (response.data && response.data.reponse && response.data.reponse.data) {
          // Map API data to our product structure
          return response.data.reponse.data.map((item: any) => ({
            id: parseInt(item.id),
            name: item.name || item.titre || '',
            description: item.description || '',
            origin: item.origin || item.origine || 'Côte d\'Ivoire',
            imageUrl: item.imageUrl || item.image || '/placeholder.svg',
            category: item.category || item.categorie || 'Produit agricole'
          }));
        }
        return [];
      } catch (error) {
        console.error('Error fetching products:', error);
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Use local data as fallback
  const products = apiProducts && apiProducts.length > 0 
    ? apiProducts 
    : productCategories.flatMap(cat => cat.products);
  
  // Filter products by active category
  const activeProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => {
        const category = productCategories.find(cat => cat.id === activeCategory);
        return category ? category.name === product.category : false;
      });

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

  return (
    <section id="products" className="py-20 bg-agritop-green-50">
      <div className="section-container">
        <h2 className="section-title">Nos produits agricoles</h2>
        
        <p className="text-agritop-earth-800 text-center max-w-3xl mx-auto mb-12">
          Découvrez notre gamme complète de produits agricoles de haute qualité en provenance de Côte d'Ivoire et d'autres pays d'Afrique de l'Ouest. Nous proposons des volumes importants pour répondre aux besoins des industries et des marchés internationaux.
        </p>
        
        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {productCategories.map((category) => (
            <div key={category.id}>
              <CategoryCard
                name={category.name}
                description={category.description}
                icon={renderIcon(category.icon)}
                active={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              />
            </div>
          ))}
        </div>
        
        {/* Loading state */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-agritop-green-500 border-r-transparent"></div>
            <p className="mt-4 text-agritop-earth-700">Chargement des produits...</p>
          </div>
        )}
        
        {/* Products */}
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {activeProducts.map((product) => (
              <div key={product.id} className="cursor-pointer" onClick={() => handleProductClick(product.id)}>
                <ProductCard
                  name={product.name}
                  description={product.description}
                  origin={product.origin}
                  imageUrl={product.imageUrl}
                  category={product.category}
                  productId={product.id.toString()}
                  onSpecsClick={() => handleProductClick(product.id)}
                  onQuoteClick={() => handleProductClick(product.id)}
                />
              </div>
            ))}
          </div>
        )}
        
        {/* Empty state */}
        {!isLoading && activeProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-agritop-earth-700">Aucun produit disponible dans cette catégorie.</p>
          </div>
        )}
        
        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="#contact"
            className="button-primary inline-flex items-center"
          >
            Voir tous nos produits
          </a>
          <p className="text-agritop-earth-700 mt-4 text-sm">
            Contactez-nous pour des informations détaillées sur nos produits, y compris les spécifications techniques, les capacités d'approvisionnement et les tarifs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
